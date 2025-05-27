// Comprehensive Calisthenics Exercise Database
export const exerciseCategories = [
  {
    id: 'handstand-development',
    name: 'Handstand Development',
    description: 'Master the art of handstand balance and pressing movements',
    muscle_focus: 'Anterior deltoids, trapezius, triceps, core stabilization',
    color: 'emerald',
    icon: '🤸‍♂️',
    totalExercises: 16
  },
  {
    id: 'pulling-strength',
    name: 'Pulling Strength',
    description: 'Develop exceptional pulling power and grip strength',
    muscle_focus: 'Latissimus dorsi, biceps, rear delts, grip strength',
    color: 'cyan',
    icon: '💪',
    totalExercises: 15
  },
  {
    id: 'pushing-power',
    name: 'Pushing Power',
    description: 'Build incredible pressing strength and control',
    muscle_focus: 'Pectorals, anterior delts, triceps, serratus anterior',
    color: 'blue',
    icon: '🔥',
    totalExercises: 14
  },
  {
    id: 'integrated-movements',
    name: 'Integrated Movements',
    description: 'Master complex full-body coordination patterns',
    muscle_focus: 'Full-body coordination, explosive power',
    color: 'purple',
    icon: '⚡',
    totalExercises: 12
  },
  {
    id: 'lower-body',
    name: 'Lower Body Development',
    description: 'Develop powerful legs and explosive jumping ability',
    muscle_focus: 'Quadriceps, glutes, hamstrings',
    color: 'indigo',
    icon: '🦵',
    totalExercises: 13
  }
];

export const exercises = {
  'handstand-development': [
    {
      id: 'wall-handstand-holds',
      name: 'Wall Handstand Holds',
      level: 1,
      phase: 'Wall-Assisted Phase',
      description: 'Build foundational handstand strength and awareness against the wall',
      prerequisites: ['Push-up strength', 'Basic core stability'],
      benefits: ['Builds shoulder strength', 'Develops proprioception', 'Safe learning environment'],
      progressionSteps: [
        'Chest-to-wall holds for 10 seconds',
        'Gradually increase to 30 seconds',
        'Work up to 60+ second holds',
        'Focus on straight body alignment'
      ],
      commonMistakes: [
        'Arching back excessively',
        'Looking up instead of down',
        'Placing hands too far from wall',
        'Not engaging core properly'
      ],
      archivedDate: '2024-01-15',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '60s' } }
    },
    {
      id: 'box-headstand-pushups',
      name: 'Box Headstand Pushups',
      level: 1,
      phase: 'Wall-Assisted Phase',
      description: 'Develop vertical pressing strength with supported headstand pushups',
      prerequisites: ['Wall handstand holds 30s+', 'Headstand comfort'],
      benefits: ['Builds pressing strength', 'Strengthens neck safely', 'Handstand preparation'],
      progressionSteps: [
        'Start with box height at knee level',
        'Perform 3 sets of 5 reps',
        'Gradually lower box height',
        'Progress to floor level'
      ],
      commonMistakes: [
        'Using only neck strength',
        'Not engaging shoulders',
        'Poor head placement',
        'Rushing the movement'
      ],
      archivedDate: '2024-01-20',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '5-8' } }
    },
    {
      id: 'freestanding-handstand',
      name: 'Freestanding Handstand',
      level: 2,
      phase: 'Free Balance Acquisition',
      description: 'Achieve the milestone of freestanding handstand balance',
      prerequisites: ['Wall handstand 60s+', 'Hollow body holds 30s+'],
      benefits: ['True balance mastery', 'Incredible core strength', 'Confidence builder'],
      progressionSteps: [
        'Kick up to balance for 1 second',
        'Gradually increase hold time',
        'Work on consistent entries',
        'Master 30+ second holds'
      ],
      commonMistakes: [
        'Kicking up too hard',
        'Not practicing consistently',
        'Neglecting wrist warm-up',
        'Poor finger pressure'
      ],
      archivedDate: '2024-02-01',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '30s' } }
    },
    {
      id: 'wall-handstand-pushups',
      name: 'Wall Handstand Pushups',
      level: 2,
      phase: 'Free Balance Acquisition',
      description: 'Develop serious overhead pressing strength',
      prerequisites: ['Freestanding handstand 15s+', 'Box HSPU mastery'],
      benefits: ['Elite pressing strength', 'Shoulder stability', 'Functional power'],
      progressionSteps: [
        'Start with partial range of motion',
        'Gradually increase depth',
        'Work up to nose-to-floor',
        'Progress to deficit variations'
      ],
      commonMistakes: [
        'Not warming up adequately',
        'Going too deep too soon',
        'Poor body alignment',
        'Neglecting eccentric control'
      ],
      archivedDate: '2024-02-15',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '3-8' } }
    }
  ],
  'pulling-strength': [
    {
      id: 'german-hang-entries',
      name: 'German Hang Entries',
      level: 1,
      phase: 'Foundational Pulls',
      description: 'Build shoulder flexibility and strength in extreme range',
      prerequisites: ['Pull-up ability', 'Shoulder mobility'],
      benefits: ['Extreme shoulder flexibility', 'Iron cross preparation', 'Injury prevention'],
      progressionSteps: [
        'Start with assisted entries',
        'Hold for 5-10 seconds',
        'Gradually increase hold time',
        'Work towards 30+ seconds'
      ],
      commonMistakes: [
        'Rushing into the position',
        'Not warming up shoulders',
        'Forcing the stretch',
        'Poor grip position'
      ],
      archivedDate: '2024-01-10',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '30s' } }
    },
    {
      id: 'tuck-front-lever',
      name: 'Tuck Front Lever',
      level: 1,
      phase: 'Foundational Pulls',
      description: 'Master the foundational front lever position',
      prerequisites: ['5+ Pull-ups', 'Hollow body holds'],
      benefits: ['Core strength', 'Lat development', 'Body awareness'],
      progressionSteps: [
        'Tuck knees to chest',
        'Hold for 5 seconds',
        'Gradually increase to 15 seconds',
        'Focus on straight arms'
      ],
      commonMistakes: [
        'Bending arms',
        'Not engaging lats',
        'Poor body position',
        'Holding breath'
      ],
      archivedDate: '2024-01-25',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '15s' } }
    },
    {
      id: 'weighted-pullups',
      name: 'Weighted Pull-ups',
      level: 2,
      phase: 'Dynamic Strength Builders',
      description: 'Build incredible pulling strength with added resistance',
      prerequisites: ['10+ strict pull-ups', 'Proper form mastery'],
      benefits: ['Maximum strength gains', 'Muscle mass building', 'Advanced skill preparation'],
      progressionSteps: [
        'Start with 10% bodyweight',
        'Progress by 5-10lbs weekly',
        'Work towards 1.5x bodyweight',
        'Maintain perfect form'
      ],
      commonMistakes: [
        'Adding weight too quickly',
        'Poor form with heavy weight',
        'Not full range of motion',
        'Swinging or kipping'
      ],
      archivedDate: '2024-02-10',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '3-6', weightTarget: '1.5x BW' } }
    },
    {
      id: 'front-lever-holds',
      name: 'Full Front Lever',
      level: 3,
      phase: 'Isometric Mastery',
      description: 'Achieve the impressive full front lever hold',
      prerequisites: ['Advanced tuck FL 20s+', 'Strong pulling base'],
      benefits: ['Elite core strength', 'Impressive skill mastery', 'Total body control'],
      progressionSteps: [
        'Master straddle front lever',
        'Work on one-leg extensions',
        'Build to full lever',
        'Hold for 10+ seconds'
      ],
      commonMistakes: [
        'Skipping progressions',
        'Sagging hips',
        'Bent arms',
        'Not breathing properly'
      ],
      archivedDate: '2024-03-01',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '10s' } }
    }
  ],
  'pushing-power': [
    {
      id: 'parallel-bar-dips',
      name: 'Parallel Bar Dips',
      level: 1,
      phase: 'Basic Pressing Competence',
      description: 'Master the fundamental pushing movement pattern',
      prerequisites: ['Push-up proficiency', 'Shoulder stability'],
      benefits: ['Chest and tricep strength', 'Functional pressing power', 'Foundation for advanced skills'],
      progressionSteps: [
        'Start with assisted dips',
        'Progress to bodyweight',
        'Work up to 15+ reps',
        'Add weight for strength'
      ],
      commonMistakes: [
        'Going too deep too soon',
        'Leaning forward excessively',
        'Not full range of motion',
        'Poor shoulder positioning'
      ],
      archivedDate: '2024-01-12',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '8-15' } }
    },
    {
      id: 'pseudo-planche-leans',
      name: 'Pseudo Planche Leans',
      level: 1,
      phase: 'Basic Pressing Competence',
      description: 'Develop planche-specific strength and conditioning',
      prerequisites: ['Strong push-ups', 'Wrist flexibility'],
      benefits: ['Planche preparation', 'Shoulder strengthening', 'Core conditioning'],
      progressionSteps: [
        'Start with hands at hip level',
        'Gradually lean forward',
        'Hold for 10-30 seconds',
        'Progress hand position forward'
      ],
      commonMistakes: [
        'Moving hands too far forward',
        'Not engaging core',
        'Poor wrist positioning',
        'Holding breath'
      ],
      archivedDate: '2024-01-18',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '30s' } }
    },
    {
      id: 'tuck-planche',
      name: 'Tuck Planche',
      level: 2,
      phase: 'Planche Development',
      description: 'Master the foundational planche position',
      prerequisites: ['Pseudo planche lean 45s+', 'Frog stand 30s+'],
      benefits: ['Core strength', 'Shoulder stability', 'Body awareness'],
      progressionSteps: [
        'Lift feet off ground',
        'Hold tuck position',
        'Work up to 15 seconds',
        'Perfect the form'
      ],
      commonMistakes: [
        'Lifting hips too high',
        'Not protracted shoulders',
        'Poor wrist alignment',
        'Rushing progression'
      ],
      archivedDate: '2024-02-05',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '15s' } }
    },
    {
      id: 'full-planche',
      name: 'Full Planche',
      level: 4,
      phase: 'Elite Pushing Skills',
      description: 'Achieve the ultimate pushing skill - full planche',
      prerequisites: ['Straddle planche 10s+', 'Years of training'],
      benefits: ['Elite strength demonstration', 'Ultimate core control', 'Incredible achievement'],
      progressionSteps: [
        'Master all progressions',
        'Build incredible strength',
        'Work on full position',
        'Hold for 5+ seconds'
      ],
      commonMistakes: [
        'Skipping progressions',
        'Impatience with progress',
        'Poor form standards',
        'Inadequate conditioning'
      ],
      archivedDate: '2024-04-01',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '5s' } }
    }
  ],
  'integrated-movements': [
    {
      id: 'kipping-muscle-up',
      name: 'Kipping Muscle-up',
      level: 1,
      phase: 'Basic Combinations',
      description: 'Learn the dynamic muscle-up with momentum assistance',
      prerequisites: ['10+ pull-ups', '10+ dips', 'High bar access'],
      benefits: ['Movement coordination', 'Dynamic strength', 'Muscle-up preparation'],
      progressionSteps: [
        'Master kipping pull-ups',
        'Practice transition',
        'Link the movement',
        'Build consistency'
      ],
      commonMistakes: [
        'Poor kip timing',
        'Weak transition',
        'Inadequate strength base',
        'Rushing the movement'
      ],
      archivedDate: '2024-01-22',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '1-5' } }
    },
    {
      id: 'strict-muscle-up',
      name: 'Strict Muscle-up',
      level: 2,
      phase: 'Dynamic Movements',
      description: 'Master the pure strength muscle-up without momentum',
      prerequisites: ['Weighted pull-ups +20kg', 'Ring dips 10+'],
      benefits: ['Pure strength demonstration', 'Elite upper body power', 'Incredible achievement'],
      progressionSteps: [
        'Build massive pulling strength',
        'Master high pull-ups',
        'Practice transition work',
        'Link the full movement'
      ],
      commonMistakes: [
        'Insufficient strength base',
        'Poor transition technique',
        'Using momentum',
        'Neglecting dip strength'
      ],
      archivedDate: '2024-02-20',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '1-3' } }
    },
    {
      id: 'human-flag',
      name: 'Human Flag',
      level: 2,
      phase: 'Dynamic Movements',
      description: 'Master the incredible lateral strength demonstration',
      prerequisites: ['Strong pulling base', 'Core mastery', 'Side planks 60s+'],
      benefits: ['Lateral strength', 'Core power', 'Visual impact'],
      progressionSteps: [
        'Practice flag raises',
        'Build to flag holds',
        'Work on full position',
        'Increase hold time'
      ],
      commonMistakes: [
        'Poor pole grip',
        'Not engaging core',
        'Insufficient strength',
        'Poor body alignment'
      ],
      archivedDate: '2024-03-10',
      demoVideoPlaceholder: true,
      metrics: { isometric: { targetHold: '5s' } }
    },
    {
      id: 'one-arm-muscle-up',
      name: 'One-Arm Muscle-up',
      level: 4,
      phase: 'Elite Combinations',
      description: 'The ultimate display of pulling and transition power',
      prerequisites: ['One-arm pull-up', 'Strict muscle-ups 10+'],
      benefits: ['Elite strength', 'Unilateral power', 'Ultimate achievement'],
      progressionSteps: [
        'Master one-arm pull-up',
        'Build transition strength',
        'Practice assisted versions',
        'Achieve full movement'
      ],
      commonMistakes: [
        'Insufficient prerequisite strength',
        'Poor technique',
        'Impatience',
        'Inadequate preparation'
      ],
      archivedDate: '2024-05-01',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '1' } }
    }
  ],
  'lower-body': [
    {
      id: 'pistol-squat-negatives',
      name: 'Pistol Squat Negatives',
      level: 1,
      phase: 'Fundamental Patterns',
      description: 'Build single-leg strength through controlled negatives',
      prerequisites: ['Basic squat strength', 'Single-leg balance'],
      benefits: ['Unilateral strength', 'Balance improvement', 'Mobility development'],
      progressionSteps: [
        'Start with assisted negatives',
        'Control 5-second descent',
        'Progress to unassisted',
        'Master full range of motion'
      ],
      commonMistakes: [
        'Descending too quickly',
        'Poor balance',
        'Inadequate ankle mobility',
        'Using momentum'
      ],
      archivedDate: '2024-01-14',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '3-8' } }
    },
    {
      id: 'shrimp-squat-progressions',
      name: 'Shrimp Squat Progressions',
      level: 1,
      phase: 'Fundamental Patterns',
      description: 'Master this advanced single-leg squat variation',
      prerequisites: ['Pistol squat competence', 'Hip flexibility'],
      benefits: ['Hip flexibility', 'Balance challenge', 'Unique movement pattern'],
      progressionSteps: [
        'Practice rear foot hold',
        'Work on balance',
        'Build range of motion',
        'Master full movement'
      ],
      commonMistakes: [
        'Poor rear leg positioning',
        'Inadequate flexibility',
        'Balance issues',
        'Forcing the movement'
      ],
      archivedDate: '2024-01-28',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '1-5' } }
    },
    {
      id: 'weighted-pistol-squats',
      name: 'Weighted Pistol Squats',
      level: 2,
      phase: 'Loaded Variations',
      description: 'Build incredible single-leg strength with added weight',
      prerequisites: ['Bodyweight pistol squats 10+', 'Perfect form'],
      benefits: ['Maximum strength', 'Progressive overload', 'Elite leg power'],
      progressionSteps: [
        'Start with 5-10kg',
        'Progress weight gradually',
        'Maintain perfect form',
        'Build to significant loads'
      ],
      commonMistakes: [
        'Adding weight too quickly',
        'Compromising form',
        'Inadequate warm-up',
        'Poor weight distribution'
      ],
      archivedDate: '2024-02-25',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '3-6', weightTarget: '+20kg' } }
    },
    {
      id: 'jumping-shrimp-squats',
      name: 'Jumping Shrimp Squats',
      level: 3,
      phase: 'Explosive Development',
      description: 'Explosive single-leg power with complex movement pattern',
      prerequisites: ['Shrimp squat mastery', 'Plyometric base'],
      benefits: ['Explosive power', 'Elite coordination', 'Impressive skill'],
      progressionSteps: [
        'Master static shrimp',
        'Add small hops',
        'Build explosive power',
        'Perfect the landing'
      ],
      commonMistakes: [
        'Poor landing mechanics',
        'Insufficient strength base',
        'Rushing progression',
        'Inadequate preparation'
      ],
      archivedDate: '2024-03-15',
      demoVideoPlaceholder: true,
      metrics: { dynamic: { repRange: '1-3' } }
    }
  ]
};

export const getExercisesByCategory = (categoryId) => {
  return exercises[categoryId] || [];
};

export const getExerciseById = (exerciseId) => {
  for (const category in exercises) {
    const exercise = exercises[category].find(ex => ex.id === exerciseId);
    if (exercise) return exercise;
  }
  return null;
};

export const getAllExercises = () => {
  const allExercises = [];
  for (const category in exercises) {
    allExercises.push(...exercises[category]);
  }
  return allExercises;
};