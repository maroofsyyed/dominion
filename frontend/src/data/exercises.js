// Complete Exercise Database for Bodyweight Fitness Progression
export const exerciseCategories = {
  'horizontal-pull': {
    id: 'horizontal-pull',
    name: 'Horizontal Pull',
    description: 'Master pull-ups, front levers, and advanced pulling movements',
    color: 'emerald',
    image: 'https://images.pexels.com/photos/4803695/pexels-photo-4803695.jpeg'
  },
  'vertical-pull': {
    id: 'vertical-pull', 
    name: 'Vertical Pull',
    description: 'Develop vertical pulling strength and power',
    color: 'green',
    image: 'https://images.pexels.com/photos/4803682/pexels-photo-4803682.jpeg'
  },
  'vertical-push': {
    id: 'vertical-push',
    name: 'Vertical Push', 
    description: 'Develop handstand strength and pressing power',
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1606827728401-939ad3483e7b'
  },
  'horizontal-push': {
    id: 'horizontal-push',
    name: 'Horizontal Push',
    description: 'Master push-up progressions and planche skills',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1599744331120-3226c87a6e25'
  },
  'core': {
    id: 'core',
    name: 'Core Mastery',
    description: 'Build unbreakable core strength and stability', 
    color: 'lime',
    image: 'https://images.pexels.com/photos/4803717/pexels-photo-4803717.jpeg'
  },
  'legs': {
    id: 'legs',
    name: 'Legs',
    description: 'Develop single-leg strength and mobility',
    color: 'forest',
    image: 'https://images.unsplash.com/photo-1472722266948-a898ab5ff257'
  }
};

export const skillLevels = {
  beginner: { name: 'Beginner', color: 'green', level: 1 },
  intermediate: { name: 'Intermediate', color: 'blue', level: 2 },
  advanced: { name: 'Advanced', color: 'yellow', level: 3 },
  elite: { name: 'Elite', color: 'orange', level: 4 }
};

export const exercises = {
  // HORIZONTAL PULL EXERCISES
  'german-hang': {
    id: 'german-hang',
    name: 'German Hang',
    category: 'horizontal-pull',
    skillLevel: 'beginner',
    description: 'A shoulder mobility and strength exercise where you hang with arms behind your back.',
    instructions: [
      'Start in a regular dead hang position',
      'Slowly rotate your hands backward while maintaining grip',
      'Lower into the german hang position',
      'Hold for prescribed time',
      'Return to starting position slowly'
    ],
    prerequisites: [],
    progressionOrder: 1,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Start with very short holds (5-10 seconds)',
      'Focus on shoulder flexibility first',
      'Never force the position - progress gradually'
    ],
    commonMistakes: [
      'Dropping into position too quickly',
      'Ignoring shoulder discomfort',
      'Not warming up properly'
    ]
  },
  'skin-the-cat': {
    id: 'skin-the-cat',
    name: 'Skin the Cat',
    category: 'horizontal-pull',
    skillLevel: 'beginner', 
    description: 'A dynamic movement that improves shoulder mobility and strength.',
    instructions: [
      'Start in dead hang position',
      'Pull knees to chest',
      'Continue rotating backward through shoulder joint',
      'Extend legs in german hang position',
      'Reverse the movement to return'
    ],
    prerequisites: ['german-hang'],
    progressionOrder: 2,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master german hang first',
      'Use slow, controlled movements',
      'Build up range of motion gradually'
    ],
    commonMistakes: [
      'Moving too fast',
      'Not having enough shoulder flexibility',
      'Skipping the static holds'
    ]
  },
  'tuck-back-lever': {
    id: 'tuck-back-lever',
    name: 'Tuck Back Lever',
    category: 'horizontal-pull',
    skillLevel: 'beginner',
    description: 'An isometric hold that builds posterior chain strength.',
    instructions: [
      'Start in german hang position',
      'Pull knees to chest while maintaining horizontal position',
      'Keep body rigid and parallel to ground',
      'Hold for prescribed time'
    ],
    prerequisites: ['skin-the-cat'],
    progressionOrder: 3,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Engage core and glutes strongly',
      'Keep knees tucked tight to chest',
      'Maintain straight line from knees to shoulders'
    ],
    commonMistakes: [
      'Letting hips sag',
      'Not engaging posterior chain',
      'Holding breath during exercise'
    ]
  },
  'adv-tuck-back-lever': {
    id: 'adv-tuck-back-lever',
    name: 'Advanced Tuck Back Lever',
    category: 'horizontal-pull',
    skillLevel: 'beginner',
    description: 'Progression toward full back lever with knees closer to 90 degrees.',
    instructions: [
      'Start in tuck back lever position',
      'Gradually open hip angle',
      'Keep knees bent but less tucked',
      'Maintain horizontal body position'
    ],
    prerequisites: ['tuck-back-lever'],
    progressionOrder: 4,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Progress slowly from tuck position',
      'Focus on posterior chain engagement',
      'Build up hold time gradually'
    ],
    commonMistakes: [
      'Opening hip angle too quickly',
      'Losing body tension',
      'Not maintaining horizontal position'
    ]
  },
  'tuck-front-lever': {
    id: 'tuck-front-lever',
    name: 'Tuck Front Lever',
    category: 'horizontal-pull',
    skillLevel: 'intermediate',
    description: 'Fundamental front lever progression building pulling strength.',
    instructions: [
      'Start from dead hang',
      'Pull knees to chest',
      'Lean back until body is horizontal',
      'Hold position with strong core engagement'
    ],
    prerequisites: ['adv-tuck-back-lever'],
    progressionOrder: 5,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master negative movements first',
      'Keep shoulders depressed and engaged',
      'Maintain hollow body position'
    ],
    commonMistakes: [
      'Allowing hips to pike',
      'Not engaging lats properly',
      'Rushing the progression'
    ]
  },
  'adv-tuck-front-lever': {
    id: 'adv-tuck-front-lever',
    name: 'Advanced Tuck Front Lever',
    category: 'horizontal-pull',
    skillLevel: 'intermediate',
    description: 'Front lever progression with more extended hip position.',
    instructions: [
      'Start in tuck front lever',
      'Gradually extend hips',
      'Keep knees bent at approximately 90 degrees',
      'Maintain horizontal body alignment'
    ],
    prerequisites: ['tuck-front-lever'],
    progressionOrder: 6,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Increase lever arm gradually',
      'Focus on lat and core strength',
      'Practice raises to build strength'
    ],
    commonMistakes: [
      'Extending too far too fast',
      'Losing shoulder position',
      'Not maintaining body tension'
    ]
  },
  'straddle-front-lever': {
    id: 'straddle-front-lever',
    name: 'Straddle Front Lever',
    category: 'horizontal-pull',
    skillLevel: 'intermediate',
    description: 'Front lever with legs in straddle position, reducing leverage.',
    instructions: [
      'From advanced tuck front lever',
      'Extend legs into wide straddle position',
      'Keep legs straight and wide',
      'Maintain horizontal body position'
    ],
    prerequisites: ['adv-tuck-front-lever'],
    progressionOrder: 7,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep legs as wide as comfortable',
      'Maintain straight leg position',
      'Focus on shoulder and lat engagement'
    ],
    commonMistakes: [
      'Not keeping legs straight',
      'Insufficient straddle width',
      'Allowing body to rotate'
    ]
  },
  'one-leg-front-lever': {
    id: 'one-leg-front-lever',
    name: 'One Leg Front Lever',
    category: 'horizontal-pull',
    skillLevel: 'intermediate',
    description: 'Front lever with one leg extended, one leg tucked.',
    instructions: [
      'Start in straddle front lever',
      'Tuck one leg to chest',
      'Keep other leg straight and horizontal',
      'Maintain overall body position'
    ],
    prerequisites: ['straddle-front-lever'],
    progressionOrder: 8,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Alternate legs for balanced development',
      'Keep extended leg perfectly straight',
      'Maintain core tension throughout'
    ],
    commonMistakes: [
      'Letting extended leg drop',
      'Not maintaining body alignment',
      'Favoring one side only'
    ]
  },
  'front-lever': {
    id: 'front-lever',
    name: 'Front Lever',
    category: 'horizontal-pull',
    skillLevel: 'intermediate',
    description: 'Full front lever with both legs straight and horizontal.',
    instructions: [
      'From one leg front lever',
      'Extend tucked leg to match extended leg',
      'Keep both legs straight and together',
      'Maintain perfect horizontal body line'
    ],
    prerequisites: ['one-leg-front-lever'],
    progressionOrder: 9,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master all previous progressions first',
      'Build up hold time gradually',
      'Focus on perfect form over duration'
    ],
    commonMistakes: [
      'Attempting too early in progression',
      'Not maintaining straight body line',
      'Insufficient shoulder strength'
    ]
  },

  // VERTICAL PULL EXERCISES
  'vertical-row': {
    id: 'vertical-row',
    name: 'Vertical Row',
    category: 'vertical-pull',
    skillLevel: 'beginner',
    description: 'Basic rowing movement to build pulling strength.',
    instructions: [
      'Set up rings or suspension trainer at chest height',
      'Grab handles with overhand grip',
      'Walk feet forward to create body angle',
      'Pull chest to handles',
      'Lower under control'
    ],
    prerequisites: [],
    progressionOrder: 1,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep body straight throughout movement',
      'Pull with elbows close to body',
      'Control the negative portion'
    ],
    commonMistakes: [
      'Allowing hips to sag',
      'Not achieving full range of motion',
      'Using momentum instead of strength'
    ]
  },
  'incline-row': {
    id: 'incline-row',
    name: 'Incline Row',
    category: 'vertical-pull',
    skillLevel: 'beginner',
    description: 'Angled rowing movement with increased difficulty.',
    instructions: [
      'Lower ring/bar height compared to vertical row',
      'Create steeper body angle',
      'Maintain straight body line',
      'Pull chest to rings/bar'
    ],
    prerequisites: ['vertical-row'],
    progressionOrder: 2,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Increase angle gradually as strength improves',
      'Focus on squeezing shoulder blades',
      'Keep core engaged throughout'
    ],
    commonMistakes: [
      'Progressing angle too quickly',
      'Not maintaining body position',
      'Incomplete range of motion'
    ]
  },
  'horizontal-row': {
    id: 'horizontal-row',
    name: 'Horizontal Row',
    category: 'vertical-pull',
    skillLevel: 'beginner',
    description: 'Horizontal body position rowing for maximum difficulty.',
    instructions: [
      'Set rings/bar at lowest possible height',
      'Lie under bar with body straight',
      'Pull chest to bar',
      'Keep body rigid throughout movement'
    ],
    prerequisites: ['incline-row'],
    progressionOrder: 3,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep heels on ground',
      'Maintain straight line from head to heels',
      'Focus on full range of motion'
    ],
    commonMistakes: [
      'Allowing body to bend',
      'Not pulling chest to bar',
      'Using legs to assist movement'
    ]
  },
  'wide-row': {
    id: 'wide-row',
    name: 'Wide Row',
    category: 'vertical-pull', 
    skillLevel: 'beginner',
    description: 'Rowing with wide grip to target different muscle groups.',
    instructions: [
      'Use wide overhand grip on bar/rings',
      'Maintain horizontal body position',
      'Pull with elbows wide',
      'Focus on rear delt engagement'
    ],
    prerequisites: ['horizontal-row'],
    progressionOrder: 4,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep elbows high and wide',
      'Squeeze shoulder blades together',
      'Control both concentric and eccentric phases'
    ],
    commonMistakes: [
      'Allowing elbows to drop',
      'Not engaging rear delts',
      'Incomplete range of motion'
    ]
  },
  'archer-row': {
    id: 'archer-row',
    name: 'Archer Row',
    category: 'vertical-pull',
    skillLevel: 'beginner',
    description: 'Unilateral rowing movement emphasizing one arm.',
    instructions: [
      'Start in horizontal row position',
      'Pull primarily with one arm',
      'Keep other arm straight for support',
      'Alternate arms between sets'
    ],
    prerequisites: ['wide-row'],
    progressionOrder: 5,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Focus on one arm doing most of the work',
      'Keep supporting arm straight',
      'Maintain body alignment'
    ],
    commonMistakes: [
      'Using both arms equally',
      'Allowing body rotation',
      'Not achieving full range on working arm'
    ]
  },

  // VERTICAL PUSH EXERCISES  
  'scapular-shrug': {
    id: 'scapular-shrug',
    name: 'Scapular Shrug',
    category: 'vertical-push',
    skillLevel: 'beginner',
    description: 'Foundation exercise for shoulder blade mobility and strength.',
    instructions: [
      'Hang from pull-up bar with straight arms',
      'Shrug shoulders up toward ears',
      'Depress shoulders down',
      'Keep arms straight throughout'
    ],
    prerequisites: [],
    progressionOrder: 1,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Focus on shoulder blade movement only',
      'Keep arms completely straight',
      'Control both up and down movements'
    ],
    commonMistakes: [
      'Bending arms during movement',
      'Using momentum',
      'Not achieving full range of motion'
    ]
  },
  'arch-hang': {
    id: 'arch-hang',
    name: 'Arch Hang',
    category: 'vertical-push',
    skillLevel: 'beginner',
    description: 'Active hanging position building shoulder strength.',
    instructions: [
      'Hang from bar with active shoulders',
      'Create slight arch in back',
      'Engage lats and rear delts',
      'Hold position for time'
    ],
    prerequisites: ['scapular-shrug'],
    progressionOrder: 2,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep shoulders actively engaged',
      'Create arch through thoracic spine',
      'Maintain breathing throughout hold'
    ],
    commonMistakes: [
      'Hanging passively',
      'Creating arch through lumbar spine only',
      'Not engaging lats properly'
    ]
  },

  // HORIZONTAL PUSH EXERCISES
  'foot-sup-l-sit': {
    id: 'foot-sup-l-sit',
    name: 'Foot Supported L-Sit',
    category: 'horizontal-push',
    skillLevel: 'beginner',
    description: 'L-sit progression with feet touching ground for support.',
    instructions: [
      'Sit between parallettes or on rings',
      'Lift body up on straight arms',
      'Keep feet on ground with legs straight',
      'Hold position'
    ],
    prerequisites: [],
    progressionOrder: 1,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Focus on pushing through hands',
      'Keep legs straight',
      'Engage core throughout'
    ],
    commonMistakes: [
      'Putting too much weight on feet',
      'Bending legs',
      'Not pushing through hands properly'
    ]
  },

  // CORE EXERCISES
  'support-hold': {
    id: 'support-hold',
    name: 'Support Hold',
    category: 'core',
    skillLevel: 'beginner',
    description: 'Basic static hold building shoulder and core strength.',
    instructions: [
      'Mount rings or parallel bars',
      'Straighten arms and support full body weight',
      'Keep shoulders depressed',
      'Maintain neutral spine'
    ],
    prerequisites: [],
    progressionOrder: 1,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep shoulders down and back',
      'Engage core to prevent arching',
      'Build up hold time gradually'
    ],
    commonMistakes: [
      'Allowing shoulders to shrug up',
      'Excessive arching in back',
      'Not engaging core properly'
    ]
  },

  // LEGS EXERCISES
  'assisted-squat': {
    id: 'assisted-squat',
    name: 'Assisted Squat',
    category: 'legs',
    skillLevel: 'beginner',
    description: 'Basic squat movement with assistance for proper form.',
    instructions: [
      'Hold onto sturdy object for support',
      'Lower into deep squat position',
      'Keep chest up and knees tracking over toes',
      'Rise back to standing'
    ],
    prerequisites: [],
    progressionOrder: 1,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Focus on mobility and proper form',
      'Go as deep as comfortable',
      'Use minimal assistance'
    ],
    commonMistakes: [
      'Relying too heavily on assistance',
      'Not achieving proper depth',
      'Allowing knees to cave inward'
    ]
  },
  'parallel-squat': {
    id: 'parallel-squat', 
    name: 'Parallel Squat',
    category: 'legs',
    skillLevel: 'beginner',
    description: 'Standard squat to parallel depth.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower until thighs are parallel to ground',
      'Keep chest up and core engaged',
      'Drive through heels to stand'
    ],
    prerequisites: ['assisted-squat'],
    progressionOrder: 2,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Focus on hip hinge movement',
      'Keep weight on heels',
      'Maintain neutral spine'
    ],
    commonMistakes: [
      'Not reaching parallel depth',
      'Knee valgus (knees caving in)',
      'Forward lean with chest'
    ]
  },

  // Additional VERTICAL PULL EXERCISES
  'ring-l-sit-pull-up': {
    id: 'ring-l-sit-pull-up',
    name: 'Ring L-Sit Pull Up',
    category: 'vertical-pull',
    skillLevel: 'intermediate',
    description: 'Pull-up performed while maintaining L-sit position.',
    instructions: [
      'Start in ring support with L-sit position',
      'Lower to dead hang while maintaining leg position',
      'Pull up to support while keeping legs horizontal',
      'Control descent back to bottom position'
    ],
    prerequisites: ['archer-row'],
    progressionOrder: 6,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master L-sit and pull-ups separately first',
      'Focus on keeping legs horizontal throughout',
      'Use slow, controlled movements'
    ],
    commonMistakes: [
      'Letting legs drop during movement',
      'Using momentum to assist',
      'Not achieving full range of motion'
    ]
  },

  'muscle-up': {
    id: 'muscle-up',
    name: 'Muscle Up',
    category: 'vertical-pull',
    skillLevel: 'advanced',
    description: 'Complete movement from hang to support above the bar.',
    instructions: [
      'Start in dead hang with false grip',
      'Pull explosively to chest level',
      'Transition over the bar with lean forward',
      'Press to full support position',
      'Lower under control'
    ],
    prerequisites: ['ring-l-sit-pull-up'],
    progressionOrder: 7,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master false grip first',
      'Practice transition separately',
      'Build explosive pulling strength'
    ],
    commonMistakes: [
      'Not using false grip',
      'Insufficient pulling strength',
      'Poor transition technique'
    ]
  },

  'one-arm-pull-up': {
    id: 'one-arm-pull-up',
    name: 'One Arm Pull Up',
    category: 'vertical-pull',
    skillLevel: 'elite',
    description: 'Ultimate pulling exercise using only one arm.',
    instructions: [
      'Hang from bar with one arm',
      'Keep other arm at side or behind back',
      'Pull body up until chin clears bar',
      'Lower under complete control'
    ],
    prerequisites: ['muscle-up'],
    progressionOrder: 8,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build up with assisted variations',
      'Develop exceptional lat strength',
      'Practice hang time extensively'
    ],
    commonMistakes: [
      'Using other arm for assistance',
      'Not building sufficient base strength',
      'Poor body positioning'
    ]
  },

  // Additional VERTICAL PUSH EXERCISES
  'pull-to-inverted': {
    id: 'pull-to-inverted',
    name: 'Pull to Inverted',
    category: 'vertical-push',
    skillLevel: 'beginner',
    description: 'Dynamic movement from hang to inverted position.',
    instructions: [
      'Start in dead hang position',
      'Pull knees to chest',
      'Continue rotating until inverted',
      'Control the movement throughout'
    ],
    prerequisites: ['arch-hang'],
    progressionOrder: 3,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build shoulder flexibility first',
      'Use controlled movements',
      'Progress gradually'
    ],
    commonMistakes: [
      'Moving too fast',
      'Insufficient shoulder mobility',
      'Not controlling the descent'
    ]
  },

  'handstand': {
    id: 'handstand',
    name: 'Handstand',
    category: 'vertical-push',
    skillLevel: 'intermediate',
    description: 'Fundamental inverted position on hands.',
    instructions: [
      'Start in downward dog position',
      'Walk feet up wall or kick up',
      'Balance on hands with body straight',
      'Hold position with control'
    ],
    prerequisites: ['pull-to-inverted'],
    progressionOrder: 4,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build wrist and shoulder strength',
      'Practice against wall first',
      'Focus on hollow body position'
    ],
    commonMistakes: [
      'Arching back excessively',
      'Not engaging core',
      'Poor hand placement'
    ]
  },

  'handstand-push-up': {
    id: 'handstand-push-up',
    name: 'Handstand Push Up',
    category: 'vertical-push',
    skillLevel: 'advanced',
    description: 'Push-up performed in handstand position.',
    instructions: [
      'Start in stable handstand position',
      'Lower head towards ground',
      'Press back to full handstand',
      'Maintain balance throughout'
    ],
    prerequisites: ['handstand'],
    progressionOrder: 5,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master handstand hold first',
      'Start with head touching ground',
      'Build pressing strength gradually'
    ],
    commonMistakes: [
      'Insufficient handstand strength',
      'Not maintaining balance',
      'Incomplete range of motion'
    ]
  },

  'human-flag': {
    id: 'human-flag',
    name: 'Human Flag',
    category: 'vertical-push',
    skillLevel: 'elite',
    description: 'Ultimate core and pressing strength demonstration.',
    instructions: [
      'Grip vertical pole with both hands',
      'Lift body horizontal to ground',
      'Maintain straight body line',
      'Hold position with full extension'
    ],
    prerequisites: ['handstand-push-up'],
    progressionOrder: 6,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build exceptional core strength',
      'Practice with bent knees first',
      'Develop shoulder stability'
    ],
    commonMistakes: [
      'Attempting without sufficient strength',
      'Poor grip positioning',
      'Not maintaining body alignment'
    ]
  },

  // Additional HORIZONTAL PUSH EXERCISES
  'one-leg-l-sit': {
    id: 'one-leg-l-sit',
    name: 'One Leg L-Sit',
    category: 'horizontal-push',
    skillLevel: 'beginner',
    description: 'L-sit progression with one leg extended.',
    instructions: [
      'Sit between parallettes or on rings',
      'Support body weight on straight arms',
      'Extend one leg straight forward',
      'Keep other leg bent or tucked'
    ],
    prerequisites: ['foot-sup-l-sit'],
    progressionOrder: 2,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Alternate legs for balanced development',
      'Focus on shoulder depression',
      'Build up hold time gradually'
    ],
    commonMistakes: [
      'Not supporting full body weight',
      'Allowing shoulders to shrug',
      'Bending extended leg'
    ]
  },

  'l-sit': {
    id: 'l-sit',
    name: 'L-Sit',
    category: 'horizontal-push',
    skillLevel: 'intermediate',
    description: 'Classic core exercise with both legs extended.',
    instructions: [
      'Support body on parallettes or rings',
      'Lift both legs horizontal to ground',
      'Keep legs straight and together',
      'Maintain position for time'
    ],
    prerequisites: ['one-leg-l-sit'],
    progressionOrder: 3,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build hip flexor strength',
      'Keep shoulders depressed',
      'Engage core strongly'
    ],
    commonMistakes: [
      'Letting legs drop',
      'Hunching shoulders',
      'Not achieving horizontal leg position'
    ]
  },

  'planche': {
    id: 'planche',
    name: 'Planche',
    category: 'horizontal-push',
    skillLevel: 'advanced',
    description: 'Advanced horizontal hold with body parallel to ground.',
    instructions: [
      'Start in push-up position',
      'Lean forward and lift feet off ground',
      'Hold body horizontal with straight arms',
      'Maintain position without touching ground'
    ],
    prerequisites: ['l-sit'],
    progressionOrder: 4,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master tuck planche first',
      'Build exceptional shoulder strength',
      'Practice lean progressions'
    ],
    commonMistakes: [
      'Insufficient lean forward',
      'Not building adequate strength base',
      'Poor hand positioning'
    ]
  },

  'one-arm-handstand': {
    id: 'one-arm-handstand',
    name: 'One Arm Handstand',
    category: 'horizontal-push',
    skillLevel: 'elite',
    description: 'Ultimate balance and strength feat on one hand.',
    instructions: [
      'Start in two-hand handstand',
      'Shift weight to one hand',
      'Lift other hand off ground',
      'Balance on single hand'
    ],
    prerequisites: ['planche'],
    progressionOrder: 5,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master two-hand handstand first',
      'Build exceptional pressing strength',
      'Practice weight shifts extensively'
    ],
    commonMistakes: [
      'Attempting without sufficient base',
      'Poor weight distribution',
      'Inadequate finger strength'
    ]
  },

  // Additional CORE EXERCISES
  'dip': {
    id: 'dip',
    name: 'Dip',
    category: 'core',
    skillLevel: 'beginner',
    description: 'Vertical pushing exercise on parallel bars.',
    instructions: [
      'Start in support position on bars',
      'Lower body by bending arms',
      'Descend until shoulders below elbows',
      'Press back to starting position'
    ],
    prerequisites: ['support-hold'],
    progressionOrder: 2,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep body upright',
      'Control the negative portion',
      'Build up range gradually'
    ],
    commonMistakes: [
      'Not achieving full depth',
      'Leaning too far forward',
      'Using momentum'
    ]
  },

  'ring-dip': {
    id: 'ring-dip',
    name: 'Ring Dip',
    category: 'core',
    skillLevel: 'intermediate',
    description: 'Dip performed on unstable rings for increased difficulty.',
    instructions: [
      'Start in ring support position',
      'Lower with control as rings move',
      'Maintain ring stability',
      'Press back to support'
    ],
    prerequisites: ['dip'],
    progressionOrder: 3,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master bar dips first',
      'Focus on ring stability',
      'Build shoulder stabilizers'
    ],
    commonMistakes: [
      'Allowing rings to flare out',
      'Not controlling the movement',
      'Insufficient stability strength'
    ]
  },

  'wall-handstand': {
    id: 'wall-handstand',
    name: 'Wall Handstand',
    category: 'core',
    skillLevel: 'intermediate',
    description: 'Handstand with wall support for balance.',
    instructions: [
      'Face away from wall',
      'Kick up to handstand against wall',
      'Keep body straight and tight',
      'Hold position for time'
    ],
    prerequisites: ['ring-dip'],
    progressionOrder: 4,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Keep minimal wall contact',
      'Focus on hollow body position',
      'Build wrist strength'
    ],
    commonMistakes: [
      'Relying too heavily on wall',
      'Arching back excessively',
      'Poor hand placement'
    ]
  },

  'freestanding-handstand': {
    id: 'freestanding-handstand',
    name: 'Freestanding Handstand',
    category: 'core',
    skillLevel: 'advanced',
    description: 'Handstand without any support or assistance.',
    instructions: [
      'Kick up to handstand position',
      'Balance without wall support',
      'Maintain straight body line',
      'Control with finger pressure'
    ],
    prerequisites: ['wall-handstand'],
    progressionOrder: 5,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Practice consistently',
      'Focus on finger balance',
      'Build core stability'
    ],
    commonMistakes: [
      'Attempting too early',
      'Poor balance technique',
      'Insufficient practice time'
    ]
  },

  'ring-planche-push-up': {
    id: 'ring-planche-push-up',
    name: 'Ring Planche Push Up',
    category: 'core',
    skillLevel: 'elite',
    description: 'Ultimate pushing exercise combining planche and push-up on rings.',
    instructions: [
      'Start in ring planche position',
      'Lower body while maintaining planche',
      'Press back to starting position',
      'Control rings throughout movement'
    ],
    prerequisites: ['freestanding-handstand'],
    progressionOrder: 6,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master ring planche first',
      'Build exceptional pressing strength',
      'Practice on stable surface first'
    ],
    commonMistakes: [
      'Insufficient planche strength',
      'Poor ring control',
      'Incomplete range of motion'
    ]
  },

  // Additional LEGS EXERCISES
  'full-squat': {
    id: 'full-squat',
    name: 'Full Squat',
    category: 'legs',
    skillLevel: 'beginner',
    description: 'Deep squat below parallel with full range of motion.',
    instructions: [
      'Lower past parallel position',
      'Descend as deep as mobility allows',
      'Keep chest up and knees tracking',
      'Drive through heels to stand'
    ],
    prerequisites: ['parallel-squat'],
    progressionOrder: 3,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Work on ankle mobility',
      'Improve hip flexibility',
      'Maintain proper alignment'
    ],
    commonMistakes: [
      'Rounding lower back',
      'Knees caving inward',
      'Rising onto toes'
    ]
  },

  'pistol-squat': {
    id: 'pistol-squat',
    name: 'Pistol Squat',
    category: 'legs',
    skillLevel: 'intermediate',
    description: 'Single-leg squat with other leg extended forward.',
    instructions: [
      'Stand on one leg',
      'Extend other leg straight forward',
      'Lower into deep single-leg squat',
      'Rise back to standing position'
    ],
    prerequisites: ['full-squat'],
    progressionOrder: 4,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build single-leg strength gradually',
      'Work on balance and flexibility',
      'Use assistance initially'
    ],
    commonMistakes: [
      'Not achieving full depth',
      'Using extended leg for support',
      'Poor balance control'
    ]
  },

  'shrimp-squat': {
    id: 'shrimp-squat',
    name: 'Shrimp Squat',
    category: 'legs',
    skillLevel: 'advanced',
    description: 'Advanced single-leg squat with rear leg held.',
    instructions: [
      'Stand on one leg',
      'Grab other foot behind body',
      'Lower into single-leg squat',
      'Keep rear leg pulled to glute'
    ],
    prerequisites: ['pistol-squat'],
    progressionOrder: 5,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Master pistol squat first',
      'Build hip flexibility',
      'Practice the hold position'
    ],
    commonMistakes: [
      'Not maintaining rear leg position',
      'Insufficient hip mobility',
      'Poor balance control'
    ]
  },

  'one-leg-nordic-curl': {
    id: 'one-leg-nordic-curl',
    name: 'One Leg Nordic Curl',
    category: 'legs',
    skillLevel: 'elite',
    description: 'Ultimate hamstring exercise performed on single leg.',
    instructions: [
      'Kneel with one leg anchored',
      'Keep other leg lifted',
      'Lower body forward using hamstrings',
      'Control eccentric phase completely'
    ],
    prerequisites: ['shrimp-squat'],
    progressionOrder: 6,
    demoVideo: 'https://www.youtube.com/embed/fZhmZnIPJFI',
    tips: [
      'Build exceptional hamstring strength',
      'Master two-leg version first',
      'Focus on eccentric control'
    ],
    commonMistakes: [
      'Insufficient hamstring strength',
      'Not controlling the descent',
      'Poor starting position'
    ]
  }
};

// Mock user progress data
export const mockUserProgress = {
  'german-hang': { status: 'completed', completedDate: '2024-01-15', holdTime: '30s' },
  'skin-the-cat': { status: 'completed', completedDate: '2024-01-20', reps: '5x3' },
  'tuck-back-lever': { status: 'current', startedDate: '2024-01-25', progress: 75 },
  'adv-tuck-back-lever': { status: 'locked', progress: 0 },
  'tuck-front-lever': { status: 'locked', progress: 0 },
  'vertical-row': { status: 'completed', completedDate: '2024-01-10', reps: '3x12' },
  'incline-row': { status: 'completed', completedDate: '2024-01-18', reps: '3x10' },
  'horizontal-row': { status: 'current', startedDate: '2024-01-22', progress: 60 },
  'scapular-shrug': { status: 'completed', completedDate: '2024-01-12', reps: '3x15' },
  'support-hold': { status: 'completed', completedDate: '2024-01-14', holdTime: '45s' },
  'assisted-squat': { status: 'completed', completedDate: '2024-01-08', reps: '3x15' },
  'parallel-squat': { status: 'current', startedDate: '2024-01-16', progress: 80 }
};

// Function to get exercises by category
export const getExercisesByCategory = (categoryId) => {
  return Object.values(exercises).filter(exercise => exercise.category === categoryId);
};

// Function to get exercise prerequisites
export const getExercisePrerequisites = (exerciseId) => {
  const exercise = exercises[exerciseId];
  if (!exercise || !exercise.prerequisites) return [];
  
  return exercise.prerequisites.map(prereqId => exercises[prereqId]).filter(Boolean);
};

// Function to check if exercise is unlocked for user
export const isExerciseUnlocked = (exerciseId, userProgress = mockUserProgress) => {
  const exercise = exercises[exerciseId];
  if (!exercise) return false;
  
  // If no prerequisites, exercise is unlocked
  if (!exercise.prerequisites || exercise.prerequisites.length === 0) return true;
  
  // Check if all prerequisites are completed
  return exercise.prerequisites.every(prereqId => 
    userProgress[prereqId] && userProgress[prereqId].status === 'completed'
  );
};

// Function to get next exercises user can unlock
export const getNextUnlockableExercises = (userProgress = mockUserProgress) => {
  return Object.values(exercises).filter(exercise => {
    const currentStatus = userProgress[exercise.id]?.status;
    return !currentStatus || currentStatus === 'locked' ? isExerciseUnlocked(exercise.id, userProgress) : false;
  });
};