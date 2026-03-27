/**
 * Learning Activities / Quizzes
 * 
 * Each activity contains a set of questions with multiple-choice answers.
 * Activities are organized by topic and difficulty level.
 * 
 * Topics:
 * - programming: Introductory programming concepts
 * - logic: Logic and reasoning exercises
 * - digital: Digital skills and literacy
 * 
 * Design rationale: The educational content is intentionally kept simple
 * to serve as a vehicle for demonstrating gamification mechanics.
 * The focus is on the gamification layer, not content depth.
 */

const activities = [
  // ──────────────── PROGRAMMING TOPIC ────────────────
  {
    id: 'prog_variables',
    title: 'Variables & Data Types',
    topic: 'programming',
    difficulty: 'easy',
    points: 50,
    estimatedMinutes: 3,
    description: 'Learn about variables and how computers store data.',
    questions: [
      {
        id: 'q1',
        text: 'What is a variable in programming?',
        options: ['A fixed value that never changes', 'A named storage location for data', 'A type of loop', 'A programming language'],
        correctIndex: 1,
        explanation: 'A variable is a named storage location that holds a value which can be changed during program execution.',
      },
      {
        id: 'q2',
        text: 'Which of these is a common data type?',
        options: ['Paragraph', 'Integer', 'Sentence', 'Document'],
        correctIndex: 1,
        explanation: 'Integer is a fundamental data type used to store whole numbers.',
      },
      {
        id: 'q3',
        text: 'What does "String" represent in programming?',
        options: ['A number', 'A sequence of characters/text', 'A boolean value', 'A memory address'],
        correctIndex: 1,
        explanation: 'A String is a data type that represents a sequence of characters, typically used for text.',
      },
    ],
  },
  {
    id: 'prog_conditionals',
    title: 'If-Else Statements',
    topic: 'programming',
    difficulty: 'easy',
    points: 50,
    estimatedMinutes: 3,
    description: 'Understand conditional logic and decision-making in code.',
    questions: [
      {
        id: 'q1',
        text: 'What does an if-else statement do?',
        options: ['Repeats code multiple times', 'Makes decisions based on conditions', 'Defines a variable', 'Imports a library'],
        correctIndex: 1,
        explanation: 'If-else statements allow programs to make decisions by executing different code based on whether a condition is true or false.',
      },
      {
        id: 'q2',
        text: 'What is the result of: if (5 > 3) { "yes" } else { "no" }?',
        options: ['no', 'yes', 'error', '5'],
        correctIndex: 1,
        explanation: '5 is greater than 3, so the condition is true and "yes" is returned.',
      },
      {
        id: 'q3',
        text: 'Which keyword is used when the if condition is false?',
        options: ['then', 'else', 'otherwise', 'except'],
        correctIndex: 1,
        explanation: 'The "else" keyword specifies the block of code to run when the if condition evaluates to false.',
      },
    ],
  },
  {
    id: 'prog_loops',
    title: 'Loops & Iteration',
    topic: 'programming',
    difficulty: 'medium',
    points: 75,
    estimatedMinutes: 4,
    description: 'Discover how loops repeat actions efficiently.',
    questions: [
      {
        id: 'q1',
        text: 'What is the main purpose of a loop?',
        options: ['To store data', 'To repeat a block of code', 'To define a function', 'To handle errors'],
        correctIndex: 1,
        explanation: 'Loops are used to execute a block of code repeatedly, based on a condition or a counter.',
      },
      {
        id: 'q2',
        text: 'How many times does "for (i=0; i<3; i++)" execute?',
        options: ['2 times', '3 times', '4 times', 'Infinite times'],
        correctIndex: 1,
        explanation: 'The loop runs for i=0, i=1, and i=2, which is 3 iterations.',
      },
      {
        id: 'q3',
        text: 'What happens if a loop condition is always true?',
        options: ['The loop runs once', 'The loop never runs', 'An infinite loop occurs', 'The program ends'],
        correctIndex: 2,
        explanation: 'If the condition is never false, the loop will continue indefinitely, causing an infinite loop.',
      },
      {
        id: 'q4',
        text: 'Which loop checks the condition before executing?',
        options: ['do-while', 'for', 'while', 'Both for and while'],
        correctIndex: 3,
        explanation: 'Both "for" and "while" loops check their condition before each iteration.',
      },
    ],
  },
  {
    id: 'prog_functions',
    title: 'Functions & Reusability',
    topic: 'programming',
    difficulty: 'medium',
    points: 75,
    estimatedMinutes: 4,
    description: 'Learn how functions help organize and reuse code.',
    questions: [
      {
        id: 'q1',
        text: 'What is a function?',
        options: ['A variable type', 'A reusable block of code', 'A loop structure', 'A data format'],
        correctIndex: 1,
        explanation: 'A function is a reusable block of code that performs a specific task and can be called by name.',
      },
      {
        id: 'q2',
        text: 'What is a "parameter" in a function?',
        options: ['The function name', 'An input value the function receives', 'The return value', 'A type of loop'],
        correctIndex: 1,
        explanation: 'Parameters are input values passed to a function to customize its behavior.',
      },
      {
        id: 'q3',
        text: 'What does the "return" keyword do?',
        options: ['Restarts the program', 'Sends a value back from the function', 'Ends the program', 'Defines a variable'],
        correctIndex: 1,
        explanation: 'The return keyword sends a value back to the calling code and exits the function.',
      },
    ],
  },
  {
    id: 'prog_arrays',
    title: 'Arrays & Lists',
    topic: 'programming',
    difficulty: 'hard',
    points: 100,
    estimatedMinutes: 5,
    description: 'Master collections of data with arrays.',
    questions: [
      {
        id: 'q1',
        text: 'What is an array?',
        options: ['A single value', 'An ordered collection of items', 'A type of function', 'A conditional statement'],
        correctIndex: 1,
        explanation: 'An array is an ordered collection of items stored under a single variable name, accessible by index.',
      },
      {
        id: 'q2',
        text: 'What is the index of the first element in most programming languages?',
        options: ['1', '0', '-1', 'It depends on the value'],
        correctIndex: 1,
        explanation: 'Most programming languages use zero-based indexing, so the first element is at index 0.',
      },
      {
        id: 'q3',
        text: 'What does array.length tell you?',
        options: ['The first element', 'The last element', 'The number of elements', 'The data type'],
        correctIndex: 2,
        explanation: 'The length property returns the total number of elements in the array.',
      },
      {
        id: 'q4',
        text: 'What does the push() method do?',
        options: ['Removes the last element', 'Adds an element to the end', 'Sorts the array', 'Reverses the array'],
        correctIndex: 1,
        explanation: 'The push() method adds one or more elements to the end of an array.',
      },
    ],
  },

  // ──────────────── LOGIC TOPIC ────────────────
  {
    id: 'logic_boolean',
    title: 'Boolean Logic',
    topic: 'logic',
    difficulty: 'easy',
    points: 50,
    estimatedMinutes: 3,
    description: 'Explore true/false logic and boolean operations.',
    questions: [
      {
        id: 'q1',
        text: 'What are the two values in Boolean logic?',
        options: ['Yes and No', 'True and False', '1 and 2', 'On and Off'],
        correctIndex: 1,
        explanation: 'Boolean logic uses True and False as its two fundamental values.',
      },
      {
        id: 'q2',
        text: 'What is the result of TRUE AND FALSE?',
        options: ['TRUE', 'FALSE', 'NULL', 'ERROR'],
        correctIndex: 1,
        explanation: 'AND requires both operands to be TRUE. Since one is FALSE, the result is FALSE.',
      },
      {
        id: 'q3',
        text: 'What is the result of TRUE OR FALSE?',
        options: ['TRUE', 'FALSE', 'NULL', 'MAYBE'],
        correctIndex: 0,
        explanation: 'OR returns TRUE if at least one operand is TRUE.',
      },
    ],
  },
  {
    id: 'logic_patterns',
    title: 'Pattern Recognition',
    topic: 'logic',
    difficulty: 'medium',
    points: 75,
    estimatedMinutes: 4,
    description: 'Test your ability to recognize patterns in sequences.',
    questions: [
      {
        id: 'q1',
        text: 'What comes next: 2, 4, 8, 16, ?',
        options: ['18', '24', '32', '20'],
        correctIndex: 2,
        explanation: 'Each number is doubled, so 16 × 2 = 32.',
      },
      {
        id: 'q2',
        text: 'What comes next: A, C, E, G, ?',
        options: ['H', 'I', 'J', 'K'],
        correctIndex: 1,
        explanation: 'Every other letter of the alphabet: A, C, E, G, I.',
      },
      {
        id: 'q3',
        text: 'What comes next: 1, 1, 2, 3, 5, ?',
        options: ['7', '8', '6', '9'],
        correctIndex: 1,
        explanation: 'This is the Fibonacci sequence. Each number is the sum of the two preceding ones: 3 + 5 = 8.',
      },
    ],
  },
  {
    id: 'logic_deduction',
    title: 'Logical Deduction',
    topic: 'logic',
    difficulty: 'hard',
    points: 100,
    estimatedMinutes: 5,
    description: 'Apply deductive reasoning to solve problems.',
    questions: [
      {
        id: 'q1',
        text: 'All cats are animals. Whiskers is a cat. What can we deduce?',
        options: ['Whiskers is not an animal', 'Whiskers is an animal', 'All animals are cats', 'Nothing can be deduced'],
        correctIndex: 1,
        explanation: 'By deductive reasoning: All cats are animals + Whiskers is a cat → Whiskers is an animal.',
      },
      {
        id: 'q2',
        text: 'If it rains, the ground gets wet. The ground is dry. What can we conclude?',
        options: ['It is raining', 'It is not raining', 'The ground is wet', 'Nothing can be concluded'],
        correctIndex: 1,
        explanation: 'This is modus tollens: If P→Q and ¬Q, then ¬P. Since the ground is not wet, it did not rain.',
      },
      {
        id: 'q3',
        text: 'Which statement is the contrapositive of "If A, then B"?',
        options: ['If B, then A', 'If not A, then not B', 'If not B, then not A', 'If A, then not B'],
        correctIndex: 2,
        explanation: 'The contrapositive of "If A then B" is "If not B, then not A" and it is logically equivalent.',
      },
      {
        id: 'q4',
        text: 'Which is an example of an invalid argument?',
        options: [
          'All dogs bark. Rex is a dog. Rex barks.',
          'Some birds fly. Tweety is a bird. Tweety flies.',
          'No fish can walk. Nemo is a fish. Nemo cannot walk.',
          'All squares are rectangles. X is a square. X is a rectangle.'
        ],
        correctIndex: 1,
        explanation: '"Some birds fly" does not guarantee that Tweety specifically can fly — this is an invalid generalization.',
      },
    ],
  },
  {
    id: 'logic_sets',
    title: 'Sets & Venn Diagrams',
    topic: 'logic',
    difficulty: 'medium',
    points: 75,
    estimatedMinutes: 4,
    description: 'Understand set operations and Venn diagrams.',
    questions: [
      {
        id: 'q1',
        text: 'What is the union of sets {1,2,3} and {3,4,5}?',
        options: ['{3}', '{1,2,3,4,5}', '{1,2,4,5}', '{1,2,3,3,4,5}'],
        correctIndex: 1,
        explanation: 'The union combines all unique elements from both sets: {1,2,3,4,5}.',
      },
      {
        id: 'q2',
        text: 'What is the intersection of sets {1,2,3} and {3,4,5}?',
        options: ['{1,2,3,4,5}', '{3}', '{1,2,4,5}', 'Empty set'],
        correctIndex: 1,
        explanation: 'The intersection contains only elements common to both sets: {3}.',
      },
      {
        id: 'q3',
        text: 'What is a subset?',
        options: ['A set with more elements', 'A set contained entirely within another set', 'The same as a superset', 'An empty set'],
        correctIndex: 1,
        explanation: 'A subset is a set where every element is also an element of another (larger or equal) set.',
      },
    ],
  },

  // ──────────────── DIGITAL SKILLS TOPIC ────────────────
  {
    id: 'digital_internet',
    title: 'How the Internet Works',
    topic: 'digital',
    difficulty: 'easy',
    points: 50,
    estimatedMinutes: 3,
    description: 'Understand the basics of how the internet functions.',
    questions: [
      {
        id: 'q1',
        text: 'What does "HTTP" stand for?',
        options: ['Hyper Text Transfer Protocol', 'High Tech Transfer Program', 'Hyper Tool Text Protocol', 'Home Transfer Text Program'],
        correctIndex: 0,
        explanation: 'HTTP stands for Hyper Text Transfer Protocol, the foundation of data communication on the web.',
      },
      {
        id: 'q2',
        text: 'What is an IP address?',
        options: ['A website name', 'A unique numerical identifier for devices on a network', 'A type of software', 'An email address'],
        correctIndex: 1,
        explanation: 'An IP address is a unique numerical label assigned to each device connected to a computer network.',
      },
      {
        id: 'q3',
        text: 'What does DNS do?',
        options: ['Encrypts data', 'Translates domain names to IP addresses', 'Stores web pages', 'Creates websites'],
        correctIndex: 1,
        explanation: 'DNS (Domain Name System) translates human-readable domain names into IP addresses that computers use.',
      },
    ],
  },
  {
    id: 'digital_security',
    title: 'Cybersecurity Basics',
    topic: 'digital',
    difficulty: 'medium',
    points: 75,
    estimatedMinutes: 4,
    description: 'Learn essential security practices for the digital world.',
    questions: [
      {
        id: 'q1',
        text: 'What is phishing?',
        options: ['A programming technique', 'A fraudulent attempt to obtain sensitive data', 'A network protocol', 'A type of firewall'],
        correctIndex: 1,
        explanation: 'Phishing is a social engineering attack where fraudulent communications trick users into revealing sensitive information.',
      },
      {
        id: 'q2',
        text: 'What makes a strong password?',
        options: ['Your birthday', 'A single common word', 'A mix of uppercase, lowercase, numbers, and symbols', 'Your username repeated'],
        correctIndex: 2,
        explanation: 'Strong passwords use a combination of character types and sufficient length to resist brute-force attacks.',
      },
      {
        id: 'q3',
        text: 'What is two-factor authentication (2FA)?',
        options: ['Using two passwords', 'Verifying identity with two different methods', 'Having two accounts', 'Logging in twice'],
        correctIndex: 1,
        explanation: '2FA adds a second layer of security by requiring a second form of verification beyond just a password.',
      },
    ],
  },
  {
    id: 'digital_data',
    title: 'Data & File Formats',
    topic: 'digital',
    difficulty: 'easy',
    points: 50,
    estimatedMinutes: 3,
    description: 'Understand different data types and common file formats.',
    questions: [
      {
        id: 'q1',
        text: 'What file format is commonly used for web images?',
        options: ['.doc', '.png', '.exe', '.mp3'],
        correctIndex: 1,
        explanation: 'PNG (Portable Network Graphics) is a widely used format for web images, supporting transparency.',
      },
      {
        id: 'q2',
        text: 'What does CSV stand for?',
        options: ['Computer System Value', 'Comma Separated Values', 'Coded Script Variable', 'Central Service Vault'],
        correctIndex: 1,
        explanation: 'CSV stands for Comma Separated Values, a simple format for storing tabular data.',
      },
      {
        id: 'q3',
        text: 'How many bits are in one byte?',
        options: ['4', '8', '16', '32'],
        correctIndex: 1,
        explanation: 'One byte consists of 8 bits and is the fundamental unit of digital information storage.',
      },
    ],
  },
  {
    id: 'digital_ai',
    title: 'Introduction to AI',
    topic: 'digital',
    difficulty: 'hard',
    points: 100,
    estimatedMinutes: 5,
    description: 'Explore the fundamentals of Artificial Intelligence.',
    questions: [
      {
        id: 'q1',
        text: 'What is Machine Learning?',
        options: ['A type of hardware', 'A subset of AI where systems learn from data', 'A programming language', 'A database system'],
        correctIndex: 1,
        explanation: 'Machine Learning is a subset of AI focused on algorithms that improve through experience and data.',
      },
      {
        id: 'q2',
        text: 'What is a neural network inspired by?',
        options: ['Computer circuits', 'The human brain', 'The internet', 'Mathematical formulas'],
        correctIndex: 1,
        explanation: 'Neural networks are inspired by the structure and function of biological neural networks in the brain.',
      },
      {
        id: 'q3',
        text: 'What is the "training" phase in Machine Learning?',
        options: ['When humans learn to use AI', 'When the model learns patterns from data', 'When the program is installed', 'When results are displayed'],
        correctIndex: 1,
        explanation: 'Training is the phase where a ML model processes data to learn patterns and relationships.',
      },
      {
        id: 'q4',
        text: 'Which is NOT a type of Machine Learning?',
        options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Sequential learning'],
        correctIndex: 3,
        explanation: 'The three main types of ML are supervised, unsupervised, and reinforcement learning.',
      },
    ],
  },
  {
    id: 'digital_cloud',
    title: 'Cloud Computing Basics',
    topic: 'digital',
    difficulty: 'medium',
    points: 75,
    estimatedMinutes: 4,
    description: 'Understand what cloud computing is and why it matters.',
    questions: [
      {
        id: 'q1',
        text: 'What is cloud computing?',
        options: ['Computing done in the sky', 'Delivery of computing services over the internet', 'A type of weather software', 'Local computer storage'],
        correctIndex: 1,
        explanation: 'Cloud computing delivers computing services (servers, storage, databases, etc.) over the internet.',
      },
      {
        id: 'q2',
        text: 'Which is an example of a cloud service?',
        options: ['A USB drive', 'Google Drive', 'A local hard disk', 'A printer'],
        correctIndex: 1,
        explanation: 'Google Drive is a cloud storage service that stores files on remote servers accessible via the internet.',
      },
      {
        id: 'q3',
        text: 'What does "SaaS" stand for?',
        options: ['Software as a Service', 'Storage as a System', 'Server and a Switch', 'System as a Software'],
        correctIndex: 0,
        explanation: 'SaaS (Software as a Service) is a cloud model where software is delivered over the internet on a subscription basis.',
      },
    ],
  },
];

export default activities;
