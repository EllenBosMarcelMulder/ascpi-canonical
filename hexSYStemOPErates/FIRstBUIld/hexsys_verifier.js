/*
 * hexSYStemOPErates JavaScript Verifier
 * Client-side compliance checking
 */

const hexSystemVerifier = {
  
  FORBIDDEN_TOKENS: [
    'if(',
    'if (',
    'switch',
    'case',
    'Math.min',
    'Math.max',
    'Date.now',
    'performance.now',
    'onClick',
    'onHover',
    'addEventListener'
  ],
  
  FORBIDDEN_KEYS: [
    'next',
    'action', 
    'goal',
    'optimize',
    'score',
    'priority',
    'probability',
    'reward',
    'decision'
  ],
  
  verifyNonDecisional(code) {
    const violations = [];
    
    this.FORBIDDEN_TOKENS.forEach(token => {
      if (code.includes(token)) {
        violations.push(`Decision token found: ${token}`);
      }
    });
    
    // Check for optimization patterns
    if (/for.*optimize|while.*improve|if.*better/.test(code)) {
      violations.push('Optimization pattern detected');
    }
    
    return violations;
  },
  
  verifyNoTimeAuthority(code) {
    const violations = [];
    
    const timePatterns = [
      /Date\.now\(\)/,
      /performance\.now\(\)/,
      /new Date\(\)/,
      /setTimeout.*logic/,
      /setInterval.*if/
    ];
    
    timePatterns.forEach(pattern => {
      if (pattern.test(code)) {
        violations.push(`Time authority pattern: ${pattern}`);
      }
    });
    
    return violations;
  },
  
  verifyJSONSchema(jsonObj) {
    const violations = [];
    
    const checkForbiddenKeys = (obj, path = '') => {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach((item, i) => {
            checkForbiddenKeys(item, `${path}[${i}]`);
          });
        } else {
          Object.keys(obj).forEach(key => {
            if (this.FORBIDDEN_KEYS.includes(key)) {
              violations.push(`Forbidden key '${key}' at ${path}`);
            }
            checkForbiddenKeys(obj[key], `${path}.${key}`);
          });
        }
      }
    };
    
    checkForbiddenKeys(jsonObj);
    return violations;
  },
  
  verifyIdempotence(code) {
    const violations = [];
    
    // Check for state accumulation
    if (/this\.\w+\s*\+=|state\s*\+=|\w+\s*=.*\w+\s*\+/.test(code)) {
      violations.push('State accumulation pattern detected');
    }
    
    // Check for mutation without clearing
    if (code.includes('push') && !code.includes('clear') && !code.includes('length = 0')) {
      violations.push('Potential non-idempotent accumulation');
    }
    
    return violations;
  },
  
  verifyCoreFunction(functionCode) {
    const violations = [];
    
    // Must contain exact signature
    if (!functionCode.includes('function project(field)')) {
      violations.push('Core function signature missing or incorrect');
    }
    
    // Must return null for invalid input
    if (!functionCode.includes('return null')) {
      violations.push('Invalid input handling missing');
    }
    
    // Must use exact hex distance formula
    if (!functionCode.includes('Math.abs(a.q - b.q)')) {
      violations.push('Hex distance formula incorrect');
    }
    
    // Must have no state persistence
    if (functionCode.includes('this.') || functionCode.includes('class ')) {
      violations.push('State persistence detected');
    }
    
    return violations;
  },
  
  verifyCode(code, type = 'javascript') {
    const violations = [];
    
    violations.push(...this.verifyNonDecisional(code));
    violations.push(...this.verifyNoTimeAuthority(code));
    violations.push(...this.verifyIdempotence(code));
    
    return {
      status: violations.length === 0 ? 'PASS' : 'FAIL',
      violations: violations
    };
  },
  
  verifyFieldState(fieldState) {
    const violations = [];
    
    // Check required structure
    if (!fieldState.topology || fieldState.topology !== 'hexagonal') {
      violations.push('Invalid topology');
    }
    
    if (!fieldState.nodes || !Array.isArray(fieldState.nodes)) {
      violations.push('Invalid nodes structure');
    }
    
    // Check for forbidden keys
    violations.push(...this.verifyJSONSchema(fieldState));
    
    return {
      status: violations.length === 0 ? 'PASS' : 'FAIL',
      violations: violations
    };
  },
  
  // Real-time verification for runtime
  verifyRuntime() {
    const violations = [];
    
    // Check if core function exists and is valid
    if (typeof project === 'function') {
      const functionStr = project.toString();
      violations.push(...this.verifyCoreFunction(functionStr));
    } else {
      violations.push('Core project function not found');
    }
    
    // Check DOM for decision elements
    const clickHandlers = document.querySelectorAll('[onclick]');
    if (clickHandlers.length > 0) {
      violations.push('Decision-making click handlers detected');
    }
    
    return {
      status: violations.length === 0 ? 'PASS' : 'FAIL',
      violations: violations,
      timestamp: new Date().toISOString()
    };
  }
  
};

// Auto-verify on load if in browser
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const result = hexSystemVerifier.verifyRuntime();
    console.log('hexSYStemOPErates Verification:', result);
  });
}