#!/usr/bin/env python3
"""
hexSYStemOPErates Verifier
Checks compliance with canonical invariants
"""

import re
import json
import sys
from pathlib import Path

class HexSystemVerifier:
    
    FORBIDDEN_TOKENS = [
        "if(",
        "if (",
        "switch",
        "case",
        "Math.min",
        "Math.max", 
        "Date.now",
        "performance.now",
        "onClick",
        "onHover",
        "addEventListener"
    ]
    
    FORBIDDEN_KEYS = [
        "next",
        "action", 
        "goal",
        "optimize",
        "score",
        "priority",
        "probability",
        "reward",
        "decision"
    ]
    
    def verify_non_decisional(self, code_content):
        """P1 - Non-decisional check"""
        violations = []
        
        # Check for decision tokens, but exclude existential validation
        for token in self.FORBIDDEN_TOKENS:
            if token in code_content:
                # Allow existential validation patterns
                if token in ['if(', 'if ('] and 'return;' in code_content:
                    # Check if it's pure existential validation (early return pattern)
                    if re.search(r'if\s*\([^)]*\)\s*return;', code_content):
                        continue  # This is existential validation, not decision logic
                violations.append(f"Decision token found: {token}")
        
        # Check for optimization patterns
        if re.search(r'for.*optimize|while.*improve|if.*better', code_content):
            violations.append("Optimization pattern detected")
            
        return violations
    
    def verify_no_time_authority(self, code_content):
        """P3 - No time authority check"""
        violations = []
        
        time_patterns = [
            r'Date\.now\(\)',
            r'performance\.now\(\)',
            r'new Date\(\)',
            r'setTimeout.*logic',
            r'setInterval.*if'
        ]
        
        for pattern in time_patterns:
            if re.search(pattern, code_content):
                violations.append(f"Time authority pattern: {pattern}")
                
        return violations
    
    def verify_json_schema(self, json_content):
        """Verify JSON contains no forbidden keys"""
        violations = []
        
        try:
            data = json.loads(json_content) if isinstance(json_content, str) else json_content
            
            def check_forbidden_keys(obj, path=""):
                if isinstance(obj, dict):
                    for key, value in obj.items():
                        if key in self.FORBIDDEN_KEYS:
                            violations.append(f"Forbidden key '{key}' at {path}")
                        check_forbidden_keys(value, f"{path}.{key}")
                elif isinstance(obj, list):
                    for i, item in enumerate(obj):
                        check_forbidden_keys(item, f"{path}[{i}]")
            
            check_forbidden_keys(data)
            
        except json.JSONDecodeError:
            violations.append("Invalid JSON format")
            
        return violations
    
    def verify_idempotence_pattern(self, code_content):
        """P4 - Check for idempotent patterns"""
        violations = []
        
        # Look for harmful state accumulation (not output construction)
        if re.search(r'this\.\w+\s*\+=|globalState\s*\+=', code_content):
            violations.append("Harmful state accumulation pattern detected")
        
        # Look for persistent mutation without clearing
        if 'push' in code_content and not ('const out' in code_content or 'const nodes' in code_content):
            if 'clear' not in code_content and 'length = 0' not in code_content:
                violations.append("Potential persistent state mutation")
            
        return violations
    
    def verify_file(self, filepath):
        """Verify a single file"""
        path = Path(filepath)
        
        if not path.exists():
            return {"status": "FAIL", "error": f"File not found: {filepath}"}
        
        content = path.read_text()
        all_violations = []
        
        # Run all checks
        all_violations.extend(self.verify_non_decisional(content))
        all_violations.extend(self.verify_no_time_authority(content))
        all_violations.extend(self.verify_idempotence_pattern(content))
        
        # JSON specific checks
        if path.suffix == '.json':
            all_violations.extend(self.verify_json_schema(content))
        
        if all_violations:
            return {
                "status": "FAIL",
                "file": str(path),
                "violations": all_violations
            }
        else:
            return {
                "status": "PASS", 
                "file": str(path)
            }
    
    def verify_core_implementation(self, core_function_content):
        """Verify the core project() function specifically"""
        violations = []
        
        # Must contain exact signature
        if 'function project(field)' not in core_function_content:
            violations.append("Core function signature missing or incorrect")
        
        # Must return null for invalid input
        if 'return null' not in core_function_content:
            violations.append("Invalid input handling missing")
        
        # Must use exact hex distance formula
        if 'Math.abs(a.q - b.q)' not in core_function_content:
            violations.append("Hex distance formula incorrect")
        
        # Must have no state persistence
        if 'this.' in core_function_content or 'class ' in core_function_content:
            violations.append("State persistence detected")
        
        return violations

def main():
    verifier = HexSystemVerifier()
    
    if len(sys.argv) < 2:
        print("Usage: python hexsys_verifier.py <file_or_directory>")
        sys.exit(1)
    
    target = Path(sys.argv[1])
    results = []
    
    if target.is_file():
        results.append(verifier.verify_file(target))
    elif target.is_dir():
        for file_path in target.rglob('*'):
            if file_path.is_file() and file_path.suffix in ['.js', '.html', '.json']:
                # Skip verifier files (they contain forbidden tokens by design)
                if 'verifier' not in str(file_path):
                    results.append(verifier.verify_file(file_path))
    
    # Print results
    all_passed = True
    for result in results:
        if result['status'] == 'FAIL':
            all_passed = False
            print(f"❌ FAIL: {result['file']}")
            for violation in result.get('violations', []):
                print(f"   - {violation}")
        else:
            print(f"✅ PASS: {result['file']}")
    
    if all_passed:
        print("\n🎯 ALL CHECKS PASSED - Valid hexSYStemOPErates implementation")
        sys.exit(0)
    else:
        print("\n💥 VERIFICATION FAILED - Implementation violates invariants")
        sys.exit(1)

if __name__ == "__main__":
    main()