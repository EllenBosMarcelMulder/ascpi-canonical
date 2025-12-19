/**
 * hexPHAseTWO Advanced Verification System
 * Validates modules, perspectives, and phase transitions
 * Ensures compliance with hexSYStemOPErates invariants
 */

class HexPhaseTwoVerifier {
    constructor() {
        this.schemas = new Map();
        this.loadedModules = new Map();
        this.invariantChecks = new Map();
        this.perspectiveStates = new Set(['universe', 'control', 'module', 'overview']);
        
        this.initializeInvariantChecks();
        this.initializeSchemas();
    }

    initializeInvariantChecks() {
        this.invariantChecks.set('non_decisional', (code) => {
            const violations = [];
            
            // Check for decision-making patterns
            const decisionPatterns = [
                /if\s*\([^)]*\)\s*{[^}]*better|worse|optimal|improve/,
                /switch\s*\([^)]*\)[^}]*optimize|select|choose/,
                /function\s+decide|choose|select|optimize/,
                /\.decide\(|\.choose\(|\.optimize\(/
            ];
            
            decisionPatterns.forEach(pattern => {
                if (pattern.test(code)) {
                    violations.push('Decision-making logic detected');
                }
            });
            
            // Check for goal-oriented code
            const goalPatterns = [
                /goal|target|objective|maximize|minimize/i,
                /best|worst|better|worse|optimal|suboptimal/i
            ];
            
            goalPatterns.forEach(pattern => {
                if (pattern.test(code) && !code.includes('// exempt:')) {
                    violations.push('Goal-oriented language detected');
                }
            });
            
            return violations;
        });

        this.invariantChecks.set('no_time_authority', (code) => {
            const violations = [];
            
            // Check for time-based logic
            const timePatterns = [
                /setTimeout.*if|setInterval.*if/,
                /Date\.now.*if|performance\.now.*if/,
                /time.*\>\=|time.*\<\=/,
                /duration.*logic|elapsed.*decide/
            ];
            
            timePatterns.forEach(pattern => {
                if (pattern.test(code)) {
                    violations.push('Time-based decision logic detected');
                }
            });
            
            return violations;
        });

        this.invariantChecks.set('idempotent', (code) => {
            const violations = [];
            
            // Check for state accumulation
            if (code.includes('++') || code.includes('+=')) {
                if (!code.includes('// idempotent-safe')) {
                    violations.push('Potential non-idempotent accumulation');
                }
            }
            
            // Check for global state modification
            if (code.includes('window.') && code.includes('=')) {
                violations.push('Global state modification detected');
            }
            
            return violations;
        });

        this.invariantChecks.set('crossed_link_neutral', (code) => {
            const violations = [];
            
            // Check for internal triggers
            const triggerPatterns = [
                /this\.activate|auto\.start|self\.trigger/,
                /internal.*trigger|automatic.*start/
            ];
            
            triggerPatterns.forEach(pattern => {
                if (pattern.test(code)) {
                    violations.push('Internal trigger mechanism detected');
                }
            });
            
            return violations;
        });

        this.invariantChecks.set('structurally_correspondent', (code) => {
            const violations = [];
            
            // Check for mathematical correspondence
            if (code.includes('project(') && !code.includes('field')) {
                violations.push('Project function missing field parameter');
            }
            
            if (code.includes('hexDistance') && !code.includes('Math.abs')) {
                violations.push('Hex distance calculation missing absolute value');
            }
            
            return violations;
        });

        this.invariantChecks.set('no_optimization', (code) => {
            const violations = [];
            
            // Check for optimization keywords
            const optimizationPatterns = [
                /optimize|performance|faster|slower/i,
                /cache.*improve|memoize.*speed/i,
                /efficient|inefficient|bottleneck/i
            ];
            
            optimizationPatterns.forEach(pattern => {
                if (pattern.test(code) && !code.includes('// description-only')) {
                    violations.push('Optimization-oriented code detected');
                }
            });
            
            return violations;
        });
    }

    initializeSchemas() {
        // Load known schemas (simplified for example)
        this.schemas.set('field_state', {
            required: ['topology', 'nodes', 'relations', 'meta'],
            topology: 'hexagonal'
        });
        
        this.schemas.set('phase_state', {
            required: ['phase_id', 'closure', 'meta', 'perspective_state'],
            closure_values: ['structurally_open', 'structurally_closed', 'transitioning']
        });
        
        this.schemas.set('module_definition', {
            required: ['module_id', 'type', 'meta', 'interface', 'content'],
            types: ['field_state', 'phase_state', 'crossed_link', 'mirror_status', 'composite', 'template', 'transform']
        });
    }

    /**
     * Verify a complete hexPHAseTWO module
     */
    verifyModule(moduleData, moduleCode = null) {
        const results = {
            status: 'UNKNOWN',
            violations: [],
            warnings: [],
            metadata: {
                module_id: moduleData.module_id || 'unknown',
                type: moduleData.type || 'unknown',
                verified_at: new Date().toISOString()
            }
        };

        try {
            // Schema validation
            this.validateSchema(moduleData, 'module_definition', results);

            // Content validation based on type
            if (moduleData.content) {
                this.validateContent(moduleData.content, moduleData.type, results);
            }

            // Code validation if provided
            if (moduleCode) {
                this.validateCode(moduleCode, results);
            }

            // Perspective validation
            if (moduleData.perspective) {
                this.validatePerspective(moduleData.perspective, results);
            }

            // Interface validation
            if (moduleData.interface) {
                this.validateInterface(moduleData.interface, results);
            }

            // Set final status
            results.status = results.violations.length === 0 ? 'PASS' : 'FAIL';

        } catch (error) {
            results.status = 'ERROR';
            results.violations.push(`Verification error: ${error.message}`);
        }

        return results;
    }

    /**
     * Verify field state data
     */
    verifyFieldState(fieldData) {
        const results = {
            status: 'UNKNOWN',
            violations: [],
            warnings: [],
            statistics: {
                node_count: 0,
                relation_count: 0,
                max_distance: 0
            }
        };

        try {
            // Basic structure validation
            if (!fieldData || typeof fieldData !== 'object') {
                results.violations.push('Field data must be an object');
                results.status = 'FAIL';
                return results;
            }

            // Required fields
            const required = ['topology', 'nodes', 'relations', 'meta'];
            required.forEach(field => {
                if (!fieldData[field]) {
                    results.violations.push(`Missing required field: ${field}`);
                }
            });

            // Topology validation
            if (fieldData.topology !== 'hexagonal') {
                results.violations.push('Topology must be "hexagonal"');
            }

            // Meta validation
            if (fieldData.meta) {
                if (fieldData.meta.phase !== 'hexPHAseTWO') {
                    results.violations.push('Meta.phase must be "hexPHAseTWO"');
                }
            }

            // Nodes validation
            if (fieldData.nodes && Array.isArray(fieldData.nodes)) {
                results.statistics.node_count = fieldData.nodes.length;
                
                fieldData.nodes.forEach((node, index) => {
                    if (!node.id || !node.position) {
                        results.violations.push(`Node ${index}: missing id or position`);
                    }
                    
                    if (node.position && (typeof node.position.q !== 'number' || typeof node.position.r !== 'number')) {
                        results.violations.push(`Node ${node.id}: invalid hex coordinates`);
                    }
                });
            }

            // Relations validation
            if (fieldData.relations && Array.isArray(fieldData.relations)) {
                results.statistics.relation_count = fieldData.relations.length;
                
                const nodeIds = new Set(fieldData.nodes?.map(n => n.id) || []);
                let maxDistance = 0;

                fieldData.relations.forEach((relation, index) => {
                    if (!relation.a || !relation.b || !relation.visibility) {
                        results.violations.push(`Relation ${index}: missing required fields`);
                    }
                    
                    if (!nodeIds.has(relation.a) || !nodeIds.has(relation.b)) {
                        results.violations.push(`Relation ${index}: references non-existent nodes`);
                    }
                    
                    if (!['low', 'mid', 'high'].includes(relation.visibility)) {
                        results.violations.push(`Relation ${index}: invalid visibility value`);
                    }

                    // Calculate distance for statistics
                    const nodeA = fieldData.nodes?.find(n => n.id === relation.a);
                    const nodeB = fieldData.nodes?.find(n => n.id === relation.b);
                    
                    if (nodeA && nodeB) {
                        const distance = this.hexDistance(nodeA.position, nodeB.position);
                        maxDistance = Math.max(maxDistance, distance);
                    }
                });

                results.statistics.max_distance = maxDistance;
            }

            results.status = results.violations.length === 0 ? 'PASS' : 'FAIL';

        } catch (error) {
            results.status = 'ERROR';
            results.violations.push(`Field state verification error: ${error.message}`);
        }

        return results;
    }

    /**
     * Verify perspective transitions
     */
    verifyPerspectiveTransition(fromState, toState, trigger, context = {}) {
        const results = {
            status: 'UNKNOWN',
            violations: [],
            warnings: [],
            transition: {
                from: fromState,
                to: toState,
                trigger: trigger,
                valid: false
            }
        };

        // Validate perspective states
        if (!this.perspectiveStates.has(fromState)) {
            results.violations.push(`Invalid source perspective: ${fromState}`);
        }

        if (!this.perspectiveStates.has(toState)) {
            results.violations.push(`Invalid target perspective: ${toState}`);
        }

        // Validate triggers
        const validTriggers = ['node_click', 'perspective_change', 'module_load', 'external_signal'];
        if (!validTriggers.includes(trigger)) {
            results.violations.push(`Invalid transition trigger: ${trigger}`);
        }

        // Check transition rules
        const invalidTransitions = [
            // No direct universe -> control without module
            { from: 'universe', to: 'control', requires: 'active_module' }
        ];

        invalidTransitions.forEach(rule => {
            if (rule.from === fromState && rule.to === toState) {
                if (rule.requires && !context[rule.requires]) {
                    results.violations.push(`Transition ${fromState} -> ${toState} requires: ${rule.requires}`);
                }
            }
        });

        // Check for crossed-link neutrality
        if (trigger === 'internal_trigger') {
            results.violations.push('Internal triggers violate crossed-link neutrality');
        }

        results.transition.valid = results.violations.length === 0;
        results.status = results.violations.length === 0 ? 'PASS' : 'FAIL';

        return results;
    }

    /**
     * Validate code against all invariants
     */
    validateCode(code, results) {
        this.invariantChecks.forEach((check, invariant) => {
            const violations = check(code);
            violations.forEach(violation => {
                results.violations.push(`${invariant}: ${violation}`);
            });
        });
    }

    /**
     * Validate schema structure
     */
    validateSchema(data, schemaType, results) {
        const schema = this.schemas.get(schemaType);
        if (!schema) {
            results.warnings.push(`No schema defined for type: ${schemaType}`);
            return;
        }

        if (schema.required) {
            schema.required.forEach(field => {
                if (!data[field]) {
                    results.violations.push(`Missing required field: ${field}`);
                }
            });
        }
    }

    /**
     * Validate content based on module type
     */
    validateContent(content, type, results) {
        switch (type) {
            case 'field_state':
                const fieldResult = this.verifyFieldState(content);
                results.violations.push(...fieldResult.violations);
                results.warnings.push(...fieldResult.warnings);
                break;
                
            case 'phase_state':
                this.validatePhaseState(content, results);
                break;
                
            default:
                results.warnings.push(`No content validation for type: ${type}`);
        }
    }

    /**
     * Validate perspective configuration
     */
    validatePerspective(perspective, results) {
        if (perspective.default_view && !this.perspectiveStates.has(perspective.default_view)) {
            results.violations.push(`Invalid default perspective view: ${perspective.default_view}`);
        }

        if (perspective.transitions) {
            perspective.transitions.forEach((transition, index) => {
                const transitionResult = this.verifyPerspectiveTransition(
                    transition.from, 
                    transition.to, 
                    transition.trigger
                );
                
                if (transitionResult.status === 'FAIL') {
                    results.violations.push(`Transition ${index}: ${transitionResult.violations.join(', ')}`);
                }
            });
        }
    }

    /**
     * Validate interface definition
     */
    validateInterface(interfaceData, results) {
        // Validate inputs
        if (interfaceData.inputs) {
            interfaceData.inputs.forEach((input, index) => {
                if (!input.name || !input.type) {
                    results.violations.push(`Input ${index}: missing name or type`);
                }
            });
        }

        // Validate outputs
        if (interfaceData.outputs) {
            interfaceData.outputs.forEach((output, index) => {
                if (!output.name || !output.type) {
                    results.violations.push(`Output ${index}: missing name or type`);
                }
            });
        }
    }

    /**
     * Calculate hex grid distance
     */
    hexDistance(posA, posB) {
        return (Math.abs(posA.q - posB.q) + 
                Math.abs(posA.q + posA.r - posB.q - posB.r) + 
                Math.abs(posA.r - posB.r)) / 2;
    }

    /**
     * Validate phase state
     */
    validatePhaseState(phaseData, results) {
        if (!phaseData.phase_id) {
            results.violations.push('Phase state missing phase_id');
        }

        const validClosures = ['structurally_open', 'structurally_closed', 'transitioning'];
        if (!validClosures.includes(phaseData.closure)) {
            results.violations.push('Phase state has invalid closure value');
        }

        if (phaseData.internal_expansion !== false) {
            results.violations.push('Phase state internal_expansion must be false');
        }
    }

    /**
     * Generate verification report
     */
    generateReport(verificationResults) {
        const report = {
            summary: {
                total_checks: verificationResults.length,
                passed: verificationResults.filter(r => r.status === 'PASS').length,
                failed: verificationResults.filter(r => r.status === 'FAIL').length,
                errors: verificationResults.filter(r => r.status === 'ERROR').length
            },
            timestamp: new Date().toISOString(),
            results: verificationResults
        };

        report.summary.success_rate = 
            report.summary.total_checks > 0 ? 
            (report.summary.passed / report.summary.total_checks * 100).toFixed(1) + '%' : 
            '0%';

        return report;
    }

    /**
     * Batch verify multiple modules
     */
    verifyBatch(modules) {
        const results = [];
        
        modules.forEach((module, index) => {
            try {
                const result = this.verifyModule(module.data, module.code);
                result.metadata.batch_index = index;
                result.metadata.module_name = module.name || `module_${index}`;
                results.push(result);
            } catch (error) {
                results.push({
                    status: 'ERROR',
                    violations: [`Batch verification error: ${error.message}`],
                    metadata: {
                        batch_index: index,
                        module_name: module.name || `module_${index}`,
                        verified_at: new Date().toISOString()
                    }
                });
            }
        });

        return this.generateReport(results);
    }
}

// Export for use in both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HexPhaseTwoVerifier;
} else {
    window.HexPhaseTwoVerifier = HexPhaseTwoVerifier;
}

// Example usage and testing
if (typeof window !== 'undefined') {
    // Browser environment - add to window for console access
    window.hexVerifier = new HexPhaseTwoVerifier();
    
    // Console commands for testing
    window.testVerifier = function() {
        const testModule = {
            module_id: "test_module",
            type: "field_state",
            meta: {
                name: "Test Module",
                version: "1.0.0",
                created: new Date().toISOString()
            },
            interface: {
                inputs: [{ name: "field", type: "field_state", required: true }],
                outputs: [{ name: "result", type: "field_state" }]
            },
            content: {
                topology: "hexagonal",
                meta: { phase: "hexPHAseTWO" },
                nodes: [
                    { id: "n1", position: { q: 0, r: 0 } },
                    { id: "n2", position: { q: 1, r: 0 } }
                ],
                relations: [
                    { a: "n1", b: "n2", visibility: "high" }
                ]
            }
        };

        return window.hexVerifier.verifyModule(testModule);
    };

    console.log('hexPHAseTWO Verifier loaded. Use testVerifier() to run a test.');
}