import type { QuizQuestion } from '@/types';
import { shuffle } from '@/lib/gameData';

export const SPECIALIZED_TRACKS = [
  'STEM', 'HUMSS', 'ABM', 'GAS', 'TVL', 'Arts and Design',
] as const;
export type SpecializedTrack = (typeof SPECIALIZED_TRACKS)[number];

function makeQ(q: string, correct: string, wrongs: string[]): QuizQuestion {
  const options = shuffle([correct, ...wrongs]);
  return { q, options, answer: options.indexOf(correct) };
}

// ===================== STEM ================================================

function stemQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const calculus: [string, string, string[]][] = [
    ['What is the derivative of x²?', '2x', ['x', 'x³', '2']],
    ['What is the derivative of x³?', '3x²', ['x²', '3x', '3']],
    ['What is the derivative of 5?', '0', ['5', '1', 'undefined']],
    ['What is the derivative of 3x?', '3', ['3x', '0', 'x']],
    ['What is the derivative of x⁴?', '4x³', ['x³', '4x', '4']],
    ['What is the integral of 2x?', 'x² + C', ['2', 'x²', '2x²']],
    ['What is the integral of 3x²?', 'x³ + C', ['3x', 'x³', 'x²']],
    ['What is the integral of 1?', 'x + C', ['1', '0', 'x²']],
    ['What is the integral of 0?', 'C', ['0', 'x', 'undefined']],
    ['What is the derivative of sin(x)?', 'cos(x)', ['-sin(x)', '-cos(x)', 'sin(x)']],
    ['What is the derivative of cos(x)?', '-sin(x)', ['cos(x)', 'sin(x)', '-cos(x)']],
    ['What is the derivative of eˣ?', 'eˣ', ['x·eˣ', 'e', 'x']],
    ['What is the derivative of ln(x)?', '1/x', ['1', 'x', 'ln(1)']],
    ['What is the limit of sin(x)/x as x→0?', '1', ['0', 'undefined', '∞']],
    ['What is the limit of (1+1/x)ˣ as x→∞?', 'e', ['1', '0', '∞']],
    ['What is the derivative of tan(x)?', 'sec²(x)', ['tan(x)', 'cot(x)', 'sec(x)']],
    ['What is the integral of 1/x?', 'ln|x| + C', ['1/x²', 'x', '0']],
    ['What is the derivative of √x?', '1/(2√x)', ['2√x', '√x', '1/√x']],
    ['What is the derivative of 1/x?', '-1/x²', ['1/x²', '-1/x', '1/x']],
    ['What is the integral of eˣ?', 'eˣ + C', ['xeˣ', 'e', 'x']],
  ];
  calculus.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const trigonometry: [string, string, string[]][] = [
    ['What is sin(0°)?', '0', ['1', 'undefined', '0.5']],
    ['What is cos(0°)?', '1', ['0', 'undefined', '0.5']],
    ['What is sin(90°)?', '1', ['0', 'undefined', '0.5']],
    ['What is cos(90°)?', '0', ['1', 'undefined', '0.5']],
    ['What is sin(30°)?', '0.5', ['0', '1', '0.866']],
    ['What is cos(30°)?', '0.866', ['0.5', '1', '0']],
    ['What is sin(45°)?', '0.707', ['0.5', '1', '0.866']],
    ['What is cos(45°)?', '0.707', ['0.5', '1', '0.866']],
    ['What is sin(60°)?', '0.866', ['0.5', '1', '0.707']],
    ['What is cos(60°)?', '0.5', ['0.866', '1', '0']],
    ['What is tan(45°)?', '1', ['0', 'undefined', '0.5']],
    ['What is tan(0°)?', '0', ['1', 'undefined', '0.5']],
    ['What is tan(90°)?', 'undefined', ['0', '1', '0.5']],
    ['What is sin²(x) + cos²(x)?', '1', ['0', '2', 'undefined']],
    ['What is the Pythagorean identity?', 'sin²θ + cos²θ = 1', ['sinθ + cosθ = 1', 'sin²θ - cos²θ = 1', 'sinθ × cosθ = 1']],
    ['What is the law of sines?', 'a/sinA = b/sinB = c/sinC', ['a + b = c', 'a² + b² = c²', 'a × b = c']],
    ['What is the law of cosines?', 'c² = a² + b² - 2ab·cos(C)', ['c² = a² + b²', 'c = a + b', 'c² = a² - b²']],
    ['In a right triangle, what is sin(θ)?', 'opposite/hypotenuse', ['adjacent/hypotenuse', 'opposite/adjacent', 'hypotenuse/opposite']],
    ['In a right triangle, what is cos(θ)?', 'adjacent/hypotenuse', ['opposite/hypotenuse', 'opposite/adjacent', 'hypotenuse/adjacent']],
    ['In a right triangle, what is tan(θ)?', 'opposite/adjacent', ['adjacent/opposite', 'hypotenuse/adjacent', 'hypotenuse/opposite']],
  ];
  trigonometry.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const physics: [string, string, string[]][] = [
    ['What is the unit of force?', 'Newton', ['Joule', 'Watt', 'Pascal']],
    ['What is the unit of energy?', 'Joule', ['Newton', 'Watt', 'Pascal']],
    ['What is the unit of power?', 'Watt', ['Newton', 'Joule', 'Pascal']],
    ['What is the speed of light?', '3 × 10⁸ m/s', ['3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s']],
    ['What is Newton\'s second law?', 'F = ma', ['F = mv', 'F = m/a', 'F = a/m']],
    ['What is the acceleration due to gravity?', '9.8 m/s²', ['8.9 m/s²', '10.8 m/s²', '9.8 m/s']],
    ['What is kinetic energy formula?', 'KE = ½mv²', ['KE = mv', 'KE = ½m²v', 'KE = mv²']],
    ['What is potential energy formula?', 'PE = mgh', ['PE = mg', 'PE = mh', 'PE = mgh²']],
    ['What is Ohm\'s law?', 'V = IR', ['V = I/R', 'V = R/I', 'V = IR²']],
    ['What is the formula for momentum?', 'p = mv', ['p = m/v', 'p = v/m', 'p = mv²']],
    ['What is the formula for work?', 'W = Fd', ['W = F/d', 'W = d/F', 'W = Fd²']],
    ['What is the formula for power?', 'P = W/t', ['P = Wt', 'P = t/W', 'P = W/t²']],
    ['What is the first law of thermodynamics?', 'Energy is conserved', ['Energy is created', 'Energy is destroyed', 'Energy is lost']],
    ['What is the second law of thermodynamics?', 'Entropy increases', ['Entropy decreases', 'Entropy is constant', 'Entropy is zero']],
    ['What is the formula for wave speed?', 'v = fλ', ['v = f/λ', 'v = λ/f', 'v = fλ²']],
    ['What is the charge of an electron?', '-1.6 × 10⁻¹⁹ C', ['1.6 × 10⁻¹⁹ C', '0', '-1.6 × 10¹⁹ C']],
    ['What is the mass of an electron?', '9.1 × 10⁻³¹ kg', ['9.1 × 10³¹ kg', '1.6 × 10⁻¹⁹ kg', '0']],
    ['What is Avogadro\'s number?', '6.022 × 10²³', ['6.022 × 10²²', '6.022 × 10²⁴', '6.022 × 10²⁰']],
    ['What is the universal gas constant?', '8.314 J/(mol·K)', ['8.314 J/mol', '8.314 J/K', '8.314 mol/K']],
    ['What is the speed of sound in air?', '343 m/s', ['343 km/s', '300 m/s', '343 cm/s']],
  ];
  physics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const chemistry: [string, string, string[]][] = [
    ['What is the pH of a neutral solution?', '7', ['0', '14', '1']],
    ['What is Avogadro\'s number?', '6.022 × 10²³', ['6.022 × 10²²', '6.022 × 10²⁴', '6.022 × 10²⁰']],
    ['What is the molar mass of water?', '18 g/mol', ['16 g/mol', '20 g/mol', '22 g/mol']],
    ['What is the molar mass of CO₂?', '44 g/mol', ['28 g/mol', '32 g/mol', '48 g/mol']],
    ['What is the molar mass of NaCl?', '58.5 g/mol', ['23 g/mol', '35.5 g/mol', '46 g/mol']],
    ['How many moles are in 36 g of water?', '2', ['1', '3', '4']],
    ['How many moles are in 88 g of CO₂?', '2', ['1', '3', '4']],
    ['What is the ideal gas law?', 'PV = nRT', ['P = nRT', 'PV = nT', 'P = V/nRT']],
    ['What is the number of electrons in a neutral atom?', 'Equal to protons', ['Equal to neutrons', 'Always 8', 'Always 2']],
    ['What is a covalent bond?', 'Sharing of electrons', ['Transfer of electrons', 'Attraction of ions', 'Metallic bond']],
    ['What is an ionic bond?', 'Transfer of electrons', ['Sharing of electrons', 'Attraction of ions', 'Metallic bond']],
    ['What is a hydrogen bond?', 'Attraction between H and electronegative atom', ['A type of ionic bond', 'A type of covalent bond', 'A type of metallic bond']],
    ['What is the most electronegative element?', 'Fluorine', ['Oxygen', 'Nitrogen', 'Chlorine']],
    ['What is the octet rule?', 'Atoms want 8 valence electrons', ['Atoms want 4 electrons', 'Atoms want 2 electrons', 'Atoms want 6 electrons']],
    ['What is a mole?', '6.022 × 10²³ particles', ['1 molecule', '1 atom', '1 gram']],
    ['What is molarity?', 'Moles per liter', ['Grams per liter', 'Moles per mL', 'Grams per mole']],
    ['What is the chemical formula for sulfuric acid?', 'H₂SO₄', ['HCl', 'HNO₃', 'H₃PO₄']],
    ['What is the chemical formula for nitric acid?', 'HNO₃', ['HCl', 'H₂SO₄', 'H₃PO₄']],
    ['What is the chemical formula for hydrochloric acid?', 'HCl', ['HNO₃', 'H₂SO₄', 'H₃PO₄']],
    ['What is oxidation?', 'Loss of electrons', ['Gain of electrons', 'No change', 'Loss of protons']],
  ];
  chemistry.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const biology: [string, string, string[]][] = [
    ['What is the basic unit of life?', 'Cell', ['Atom', 'Molecule', 'Tissue']],
    ['What is the powerhouse of the cell?', 'Mitochondria', ['Nucleus', 'Ribosome', 'Golgi body']],
    ['What is the process of cell division?', 'Mitosis', ['Meiosis', 'Fusion', 'Fission']],
    ['What is DNA?', 'Deoxyribonucleic acid', ['Ribonucleic acid', 'Protein', 'Carbohydrate']],
    ['What is the double helix structure of DNA discovered by?', 'Watson and Crick', ['Darwin and Mendel', 'Pasteur and Koch', 'Franklin and Wilkins']],
    ['What is the process of making RNA from DNA?', 'Transcription', ['Translation', 'Replication', 'Mutation']],
    ['What is the process of making protein from RNA?', 'Translation', ['Transcription', 'Replication', 'Mutation']],
    ['What are the building blocks of proteins?', 'Amino acids', ['Nucleotides', 'Sugars', 'Fatty acids']],
    ['What is the human genome?', 'All human DNA', ['All human proteins', 'All human cells', 'All human genes']],
    ['What is a gene?', 'Section of DNA that codes for a protein', ['A type of cell', 'A type of protein', 'A type of molecule']],
    ['What is CRISPR?', 'Gene editing tool', ['A type of microscope', 'A type of cell', 'A type of protein']],
    ['What is PCR?', 'DNA amplification technique', ['A type of protein', 'A type of cell', 'A type of gene']],
    ['What is gel electrophoresis?', 'DNA separation technique', ['A type of gel', 'A type of electricity', 'A type of microscope']],
    ['What is a mutation?', 'Change in DNA sequence', ['Change in protein', 'Change in cell', 'Change in tissue']],
    ['What is natural selection?', 'Survival of the fittest', ['Random selection', 'Artificial selection', 'Human selection']],
  ];
  biology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const engineering: [string, string, string[]][] = [
    ['What is the SI unit of length?', 'Meter', ['Foot', 'Inch', 'Yard']],
    ['What is the SI unit of mass?', 'Kilogram', ['Pound', 'Ounce', 'Ton']],
    ['What is the SI unit of time?', 'Second', ['Minute', 'Hour', 'Day']],
    ['What is the SI unit of temperature?', 'Kelvin', ['Celsius', 'Fahrenheit', 'Rankine']],
    ['What is the SI unit of electric current?', 'Ampere', ['Volt', 'Ohm', 'Watt']],
    ['What is the engineering design process?', 'Steps to solve problems', ['A type of drawing', 'A type of building', 'A type of machine']],
    ['What is the first step in the engineering design process?', 'Identify the problem', ['Build a prototype', 'Test the solution', 'Communicate results']],
    ['What is a prototype?', 'First version of a product', ['Final product', 'A type of material', 'A type of tool']],
    ['What is CAD?', 'Computer-Aided Design', ['Computer-Aided Drawing', 'Computer-Aided Development', 'Computer-Aided Drafting']],
    ['What is the difference between accuracy and precision?', 'Accuracy is closeness to true value, precision is consistency', ['They are the same', 'Accuracy is consistency, precision is closeness', 'Both mean the same']],
    ['What is a circuit?', 'Path for electric current', ['A type of switch', 'A type of wire', 'A type of battery']],
    ['What is a resistor?', 'Component that resists current', ['Component that creates current', 'Component that stores current', 'Component that measures current']],
    ['What is a capacitor?', 'Component that stores charge', ['Component that resists current', 'Component that creates current', 'Component that measures current']],
    ['What is an inductor?', 'Component that stores energy in a magnetic field', ['Component that stores charge', 'Component that resists current', 'Component that creates current']],
    ['What is a transistor?', 'Semiconductor that amplifies or switches', ['A type of resistor', 'A type of capacitor', 'A type of inductor']],
  ];
  engineering.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== HUMSS ================================================

function humssQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const politicalScience: [string, string, string[]][] = [
    ['What is democracy?', 'Government by the people', ['Government by one person', 'Government by the military', 'Government by the wealthy']],
    ['What is a republic?', 'Government without a monarch', ['Government with a monarch', 'Government by the military', 'Government by the wealthy']],
    ['What is a monarchy?', 'Government with a king or queen', ['Government by the people', 'Government by the military', 'Government by the wealthy']],
    ['What is a dictatorship?', 'Government by one person with absolute power', ['Government by the people', 'Government by a group', 'Government by the wealthy']],
    ['What is a constitution?', 'Supreme law of the land', ['A type of law', 'A type of court', 'A type of judge']],
    ['What are the three branches of government?', 'Executive, Legislative, Judicial', ['Police, Army, Navy', 'President, VP, Senate', 'House, Senate, Court']],
    ['What is the executive branch?', 'Enforces laws', ['Makes laws', 'Interprets laws', 'Changes laws']],
    ['What is the legislative branch?', 'Makes laws', ['Enforces laws', 'Interprets laws', 'Changes laws']],
    ['What is the judicial branch?', 'Interprets laws', ['Enforces laws', 'Makes laws', 'Changes laws']],
    ['What is a bill?', 'Proposed law', ['A type of money', 'A type of tax', 'A type of court']],
  ];
  politicalScience.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const psychology: [string, string, string[]][] = [
    ['What is psychology?', 'Study of the mind and behavior', ['Study of the brain only', 'Study of the body only', 'Study of animals only']],
    ['Who is the father of psychology?', 'Wilhelm Wundt', ['Sigmund Freud', 'Carl Jung', 'B.F. Skinner']],
    ['Who founded psychoanalysis?', 'Sigmund Freud', ['Wilhelm Wundt', 'Carl Jung', 'B.F. Skinner']],
    ['What is classical conditioning?', 'Learning through association', ['Learning through reward', 'Learning through punishment', 'Learning through observation']],
    ['Who discovered classical conditioning?', 'Ivan Pavlov', ['Sigmund Freud', 'B.F. Skinner', 'John Watson']],
    ['What is operant conditioning?', 'Learning through consequences', ['Learning through association', 'Learning through observation', 'Learning through imitation']],
    ['Who discovered operant conditioning?', 'B.F. Skinner', ['Ivan Pavlov', 'Sigmund Freud', 'John Watson']],
    ['What is Maslow\'s hierarchy of needs?', 'Pyramid of human needs', ['A type of test', 'A type of therapy', 'A type of theory']],
    ['What is at the top of Maslow\'s hierarchy?', 'Self-actualization', ['Food', 'Safety', 'Love']],
    ['What is at the bottom of Maslow\'s hierarchy?', 'Physiological needs', ['Self-actualization', 'Safety', 'Love']],
    ['What is cognitive psychology?', 'Study of mental processes', ['Study of behavior only', 'Study of the brain only', 'Study of animals only']],
    ['What is behavioral psychology?', 'Study of observable behavior', ['Study of mental processes', 'Study of the brain', 'Study of animals']],
    ['What is social psychology?', 'Study of social interactions', ['Study of the brain', 'Study of animals', 'Study of the body']],
    ['What is developmental psychology?', 'Study of human growth and development', ['Study of the brain', 'Study of animals', 'Study of society']],
    ['What is abnormal psychology?', 'Study of mental disorders', ['Study of normal behavior', 'Study of the brain', 'Study of animals']],
  ];
  psychology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const sociology: [string, string, string[]][] = [
    ['What is sociology?', 'Study of society and social behavior', ['Study of the mind', 'Study of the brain', 'Study of animals']],
    ['Who is the father of sociology?', 'Auguste Comte', ['Karl Marx', 'Emile Durkheim', 'Max Weber']],
    ['What is a social institution?', 'Established pattern of behavior', ['A type of building', 'A type of school', 'A type of hospital']],
    ['What is socialization?', 'Process of learning social norms', ['Process of learning math', 'Process of learning science', 'Process of learning language']],
    ['What is culture?', 'Shared beliefs and practices', ['Individual beliefs', 'Personal practices', 'Random behaviors']],
    ['What is a norm?', 'Rule of behavior in society', ['A type of law', 'A type of test', 'A type of standard']],
    ['What is a value?', 'Belief about what is good or bad', ['A type of number', 'A type of price', 'A type of rule']],
    ['What is social stratification?', 'Division of society into layers', ['Mixing of society', 'Equality in society', 'Random society']],
    ['What is social mobility?', 'Movement between social layers', ['Staying in one layer', 'Moving sideways', 'Not moving']],
    ['What is a social group?', 'People who interact regularly', ['People who don\'t interact', 'People who are alone', 'People who are random']],
    ['What is Karl Marx known for?', 'Theory of class struggle', ['Theory of evolution', 'Theory of relativity', 'Theory of gravity']],
    ['What is Emile Durkheim known for?', 'Study of social solidarity', ['Theory of evolution', 'Theory of relativity', 'Theory of gravity']],
    ['What is Max Weber known for?', 'Study of bureaucracy', ['Theory of evolution', 'Theory of relativity', 'Theory of gravity']],
    ['What is functionalism?', 'Society as interconnected parts', ['Society as random parts', 'Society as one part', 'Society as no parts']],
    ['What is conflict theory?', 'Society as competition', ['Society as cooperation', 'Society as harmony', 'Society as equality']],
  ];
  sociology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const philosophy: [string, string, string[]][] = [
    ['What is philosophy?', 'Love of wisdom', ['Love of money', 'Love of power', 'Love of fame']],
    ['Who said "I think, therefore I am"?', 'René Descartes', ['Plato', 'Aristotle', 'Socrates']],
    ['Who is the father of philosophy?', 'Socrates', ['Plato', 'Aristotle', 'René Descartes']],
    ['Who was Plato\'s student?', 'Aristotle', ['Socrates', 'René Descartes', 'Immanuel Kant']],
    ['Who was Aristotle\'s teacher?', 'Plato', ['Socrates', 'René Descartes', 'Immanuel Kant']],
    ['What is ethics?', 'Study of right and wrong', ['Study of numbers', 'Study of stars', 'Study of the mind']],
    ['What is metaphysics?', 'Study of reality', ['Study of right and wrong', 'Study of knowledge', 'Study of society']],
    ['What is epistemology?', 'Study of knowledge', ['Study of reality', 'Study of right and wrong', 'Study of society']],
    ['What is logic?', 'Study of reasoning', ['Study of reality', 'Study of right and wrong', 'Study of knowledge']],
    ['What is aesthetics?', 'Study of beauty and art', ['Study of reality', 'Study of right and wrong', 'Study of knowledge']],
    ['What is existentialism?', 'Focus on individual existence', ['Focus on society', 'Focus on numbers', 'Focus on nature']],
    ['Who is associated with existentialism?', 'Jean-Paul Sartre', ['Plato', 'Aristotle', 'René Descartes']],
    ['What is utilitarianism?', 'Greatest good for greatest number', ['Good for one person', 'Good for the rich', 'Good for the powerful']],
    ['Who is associated with utilitarianism?', 'John Stuart Mill', ['Plato', 'Aristotle', 'René Descartes']],
    ['What is the Socratic method?', 'Asking questions to find truth', ['Memorizing facts', 'Reading books', 'Taking tests']],
  ];
  philosophy.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const history: [string, string, string[]][] = [
    ['What was the first World War?', '1914-1918', ['1939-1945', '1900-1910', '1950-1960']],
    ['What was the second World War?', '1939-1945', ['1914-1918', '1900-1910', '1950-1960']],
    ['Who was the leader of Nazi Germany?', 'Adolf Hitler', ['Joseph Stalin', 'Benito Mussolini', 'Winston Churchill']],
    ['Who was the leader of Soviet Union during WWII?', 'Joseph Stalin', ['Adolf Hitler', 'Benito Mussolini', 'Winston Churchill']],
    ['Who was the British PM during WWII?', 'Winston Churchill', ['Adolf Hitler', 'Joseph Stalin', 'Benito Mussolini']],
    ['What event started WWI?', 'Assassination of Archduke Franz Ferdinand', ['Pearl Harbor', 'D-Day', 'Fall of Berlin']],
    ['What event started WWII?', 'Invasion of Poland', ['Assassination of Archduke', 'Pearl Harbor', 'D-Day']],
    ['What event ended WWII in Europe?', 'Fall of Berlin', ['Pearl Harbor', 'D-Day', 'Hiroshima']],
    ['What event ended WWII in the Pacific?', 'Atomic bombs on Japan', ['D-Day', 'Fall of Berlin', 'Pearl Harbor']],
    ['What was the Cold War?', 'Tension between USA and USSR', ['War between USA and Russia', 'War between USA and China', 'War between Europe and Asia']],
  ];
  history.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== ABM ================================================

function abmQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const accounting: [string, string, string[]][] = [
    ['What is the accounting equation?', 'Assets = Liabilities + Equity', ['Assets = Equity - Liabilities', 'Assets + Liabilities = Equity', 'Liabilities = Assets + Equity']],
    ['What are assets?', 'What a business owns', ['What a business owes', 'What a business earns', 'What a business spends']],
    ['What are liabilities?', 'What a business owes', ['What a business owns', 'What a business earns', 'What a business spends']],
    ['What is equity?', 'Owner\'s interest in the business', ['What the business owes', 'What the business owns', 'What the business earns']],
    ['What is revenue?', 'Money earned from sales', ['Money spent', 'Money borrowed', 'Money saved']],
    ['What is an expense?', 'Money spent on operations', ['Money earned', 'Money borrowed', 'Money saved']],
    ['What is profit?', 'Revenue minus expenses', ['Revenue plus expenses', 'Expenses minus revenue', 'Revenue only']],
    ['What is a balance sheet?', 'Statement of financial position', ['Statement of income', 'Statement of cash flow', 'Statement of profit']],
    ['What is an income statement?', 'Statement of revenue and expenses', ['Statement of assets', 'Statement of cash flow', 'Statement of position']],
    ['What is a cash flow statement?', 'Statement of cash inflows and outflows', ['Statement of assets', 'Statement of income', 'Statement of position']],
    ['What is debit?', 'Left side of an account', ['Right side of an account', 'Top of an account', 'Bottom of an account']],
    ['What is credit?', 'Right side of an account', ['Left side of an account', 'Top of an account', 'Bottom of an account']],
    ['What is a journal?', 'Book of original entry', ['Book of final entry', 'Book of accounts', 'Book of reports']],
    ['What is a ledger?', 'Book of final entry', ['Book of original entry', 'Book of reports', 'Book of accounts']],
    ['What is accounts receivable?', 'Money owed to the business', ['Money the business owes', 'Money the business earns', 'Money the business spends']],
  ];
  accounting.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const businessMath: [string, string, string[]][] = [
    ['What is simple interest formula?', 'I = Prt', ['I = P + rt', 'I = P/r', 'I = Pr/t']],
    ['What is the simple interest on 1000 at 5% for 2 years?', '100', ['50', '200', '10']],
    ['What is the simple interest on 5000 at 3% for 1 year?', '150', ['50', '300', '15']],
    ['What is the simple interest on 2000 at 4% for 3 years?', '240', ['60', '120', '240']],
    ['What is the simple interest on 10000 at 2% for 5 years?', '1000', ['100', '200', '500']],
    ['What is the future value formula for simple interest?', 'FV = P(1 + rt)', ['FV = P + rt', 'FV = P × rt', 'FV = P/(1 + rt)']],
    ['What is the future value of 1000 at 5% for 2 years (simple)?', '1100', ['1050', '1200', '1000']],
    ['What is the compound interest formula?', 'FV = P(1 + r)^t', ['FV = P(1 + rt)', 'FV = P + r^t', 'FV = P × r^t']],
    ['What is the future value of 1000 at 5% compounded for 2 years?', '1102.50', ['1050', '1100', '1200']],
    ['What is the future value of 2000 at 10% compounded for 2 years?', '2420', ['2200', '2400', '2000']],
    ['What is 10% of 500?', '50', ['5', '100', '500']],
    ['What is 20% of 300?', '60', ['30', '6', '300']],
    ['What is 25% of 800?', '200', ['100', '400', '800']],
    ['What is 15% of 200?', '30', ['20', '15', '40']],
    ['What is 5% of 1000?', '50', ['5', '100', '500']],
    ['If a shirt costs 200 and is 20% off, what is the sale price?', '160', ['180', '150', '40']],
    ['If a book costs 500 and is 30% off, what is the sale price?', '350', ['400', '300', '150']],
    ['If a phone costs 10000 and is 10% off, what is the sale price?', '9000', ['9500', '8000', '1000']],
    ['What is the markup if cost is 100 and selling price is 150?', '50', ['100', '150', '25']],
    ['What is the markup percentage if cost is 100 and selling price is 150?', '50%', ['25%', '100%', '150%']],
  ];
  businessMath.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const economics: [string, string, string[]][] = [
    ['What is economics?', 'Study of how people use resources', ['Study of money only', 'Study of business only', 'Study of trade only']],
    ['What is supply?', 'Amount producers are willing to sell', ['Amount consumers want to buy', 'Amount of money available', 'Amount of goods in stock']],
    ['What is demand?', 'Amount consumers want to buy', ['Amount producers want to sell', 'Amount of money available', 'Amount of goods in stock']],
    ['What is the law of supply?', 'Price increases, supply increases', ['Price increases, supply decreases', 'Price decreases, supply increases', 'No relationship']],
    ['What is the law of demand?', 'Price increases, demand decreases', ['Price increases, demand increases', 'Price decreases, demand decreases', 'No relationship']],
    ['What is equilibrium?', 'Where supply equals demand', ['Where supply is more than demand', 'Where demand is more than supply', 'Where there is no trade']],
    ['What is inflation?', 'Increase in prices over time', ['Decrease in prices', 'No change in prices', 'Increase in wages']],
    ['What is deflation?', 'Decrease in prices over time', ['Increase in prices', 'No change in prices', 'Decrease in wages']],
    ['What is GDP?', 'Total value of goods and services produced', ['Total amount of money', 'Total number of people', 'Total number of businesses']],
    ['What is a monopoly?', 'One seller controls the market', ['Many sellers compete', 'Government controls market', 'No market exists']],
    ['What is an oligopoly?', 'Few sellers control the market', ['One seller controls market', 'Many sellers compete', 'Government controls market']],
    ['What is perfect competition?', 'Many buyers and sellers', ['One seller', 'Few sellers', 'Government controls']],
    ['What is opportunity cost?', 'Value of the next best alternative', ['Cost of the chosen option', 'Cost of all options', 'No cost']],
    ['What is scarcity?', 'Limited resources vs unlimited wants', ['Abundant resources', 'No wants', 'No resources']],
    ['What is a market economy?', 'Decisions made by buyers and sellers', ['Decisions made by government', 'Decisions made by one person', 'No decisions made']],
  ];
  economics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const marketing: [string, string, string[]][] = [
    ['What is marketing?', 'Promoting and selling products', ['Making products', 'Buying products', 'Using products']],
    ['What are the 4 Ps of marketing?', 'Product, Price, Place, Promotion', ['People, Process, Physical, Profit', 'Product, People, Place, Profit', 'Price, Process, People, Promotion']],
    ['What is a target market?', 'Group of customers for a product', ['All people', 'Competitors', 'Suppliers']],
    ['What is a brand?', 'Name or symbol identifying a product', ['A product itself', 'A price', 'A store']],
    ['What is advertising?', 'Paid promotion of products', ['Free promotion', 'Personal selling', 'Direct mail']],
    ['What is market research?', 'Gathering information about customers', ['Selling products', 'Making products', 'Buying products']],
    ['What is a product life cycle?', 'Stages from introduction to decline', ['A type of machine', 'A type of test', 'A type of report']],
    ['What is customer satisfaction?', 'Meeting customer expectations', ['Exceeding expectations always', 'Not meeting expectations', 'Ignoring expectations']],
    ['What is a unique selling proposition?', 'What makes a product different', ['What makes a product same', 'What makes a product cheap', 'What makes a product expensive']],
    ['What is social media marketing?', 'Promoting on social platforms', ['Promoting on TV', 'Promoting on radio', 'Promoting on print']],
  ];
  marketing.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const management: [string, string, string[]][] = [
    ['What is management?', 'Planning, organizing, leading, controlling', ['Only planning', 'Only organizing', 'Only leading']],
    ['What is planning?', 'Setting goals and deciding how to achieve them', ['Doing the work', 'Hiring people', 'Firing people']],
    ['What is organizing?', 'Arranging resources to achieve goals', ['Setting goals', 'Doing the work', 'Firing people']],
    ['What is leading?', 'Motivating and directing people', ['Setting goals', 'Arranging resources', 'Controlling']],
    ['What is controlling?', 'Monitoring performance and taking action', ['Setting goals', 'Arranging resources', 'Motivating']],
    ['What is a mission statement?', 'Statement of purpose', ['A type of report', 'A type of plan', 'A type of goal']],
    ['What is a vision statement?', 'Statement of future goals', ['A type of report', 'A type of plan', 'A type of mission']],
    ['What is SWOT analysis?', 'Strengths, Weaknesses, Opportunities, Threats', ['Sales, Wages, Orders, Taxes', 'System, Web, Operations, Technology', 'Strategy, Work, Organization, Team']],
    ['What is delegation?', 'Assigning tasks to others', ['Doing all tasks yourself', 'Not assigning tasks', 'Avoiding tasks']],
    ['What is teamwork?', 'Working together toward a goal', ['Working alone', 'Working against each other', 'Not working']],
  ];
  management.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== GAS ================================================

function gasQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const general: [string, string, string[]][] = [
    ['What is the capital of the Philippines?', 'Manila', ['Cebu', 'Davao', 'Quezon City']],
    ['Who was the national hero of the Philippines?', 'Jose Rizal', ['Andres Bonifacio', 'Emilio Aguinaldo', 'Apolinario Mabini']],
    ['What is the national language of the Philippines?', 'Filipino', ['English', 'Cebuano', 'Ilocano']],
    ['What is the currency of the Philippines?', 'Peso', ['Dollar', 'Yen', 'Euro']],
    ['What is the largest island in the Philippines?', 'Luzon', ['Mindanao', 'Visayas', 'Palawan']],
    ['What is the basic unit of life?', 'Cell', ['Atom', 'Molecule', 'Tissue']],
    ['What is the powerhouse of the cell?', 'Mitochondria', ['Nucleus', 'Ribosome', 'Golgi body']],
    ['What is the chemical symbol for water?', 'H2O', ['CO2', 'O2', 'NaCl']],
    ['What is the unit of force?', 'Newton', ['Joule', 'Watt', 'Pascal']],
    ['What is the speed of light?', '3 × 10⁸ m/s', ['3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s']],
  ];
  general.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const math: [string, string, string[]][] = [
    ['If x + 5 = 12, what is x?', '7', ['5', '6', '8']],
    ['If 2x = 10, what is x?', '5', ['3', '4', '6']],
    ['If x/2 = 6, what is x?', '12', ['8', '10', '14']],
    ['What is 5 + 3?', '8', ['6', '7', '9']],
    ['What is 10 - 4?', '6', ['4', '5', '7']],
    ['What is 6 × 7?', '42', ['36', '48', '40']],
    ['What is 24 ÷ 4?', '6', ['4', '8', '12']],
    ['What is the mean of 2, 4, 6, 8, 10?', '6', ['5', '7', '8']],
    ['What is the median of 2, 4, 6, 8, 10?', '6', ['4', '8', '5']],
    ['What is the mode of 2, 2, 3, 4, 5?', '2', ['3', '4', '5']],
    ['What is 1/2 + 1/4?', '3/4', ['1/6', '2/6', '1/8']],
    ['What is 25% of 80?', '20', ['15', '25', '40']],
    ['What is the derivative of x²?', '2x', ['x', 'x³', '2']],
    ['What is the integral of 2x?', 'x² + C', ['2', 'x²', '2x²']],
    ['What is sin(90°)?', '1', ['0', 'undefined', '0.5']],
  ];
  math.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const english: [string, string, string[]][] = [
    ['What is the past tense of "go"?', 'Went', ['Goes', 'Going', 'Gone']],
    ['What is the plural of "child"?', 'Children', ['Childs', 'Childes', 'Childies']],
    ['What is a noun?', 'Person, place, or thing', ['Action word', 'Describing word', 'Connecting word']],
    ['What is a verb?', 'Action word', ['Person, place, or thing', 'Describing word', 'Connecting word']],
    ['What is an adjective?', 'Describing word', ['Action word', 'Person, place, or thing', 'Connecting word']],
    ['Who wrote "Romeo and Juliet"?', 'William Shakespeare', ['Charles Dickens', 'Jane Austen', 'Mark Twain']],
    ['What is the synonym of "happy"?', 'Joyful', ['Sad', 'Angry', 'Tired']],
    ['What is the antonym of "hot"?', 'Cold', ['Warm', 'Boiling', 'Spicy']],
    ['What is a metaphor?', 'Direct comparison', ['Comparison using "like" or "as"', 'Exaggeration', 'Sound word']],
    ['What is a simile?', 'Comparison using "like" or "as"', ['Direct comparison', 'Exaggeration', 'Sound word']],
  ];
  english.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const science: [string, string, string[]][] = [
    ['What is the 3rd planet from the sun?', 'Earth', ['Mars', 'Venus', 'Jupiter']],
    ['What is the largest planet?', 'Jupiter', ['Earth', 'Saturn', 'Neptune']],
    ['How many planets are in our solar system?', '8', ['7', '9', '10']],
    ['What is the chemical symbol for oxygen?', 'O2', ['H2O', 'CO2', 'NaCl']],
    ['What is the pH of pure water?', '7', ['0', '14', '1']],
    ['What is the unit of force?', 'Newton', ['Joule', 'Watt', 'Pascal']],
    ['What is the speed of light?', '3 × 10⁸ m/s', ['3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s']],
    ['What is the basic unit of life?', 'Cell', ['Atom', 'Molecule', 'Tissue']],
    ['What is the powerhouse of the cell?', 'Mitochondria', ['Nucleus', 'Ribosome', 'Golgi body']],
    ['What is the process of plants making food?', 'Photosynthesis', ['Respiration', 'Digestion', 'Transpiration']],
  ];
  science.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const socialStudies: [string, string, string[]][] = [
    ['What is democracy?', 'Government by the people', ['Government by one person', 'Government by the military', 'Government by the wealthy']],
    ['What are the three branches of government?', 'Executive, Legislative, Judicial', ['Police, Army, Navy', 'President, VP, Senate', 'House, Senate, Court']],
    ['What is the supreme law of the land?', 'Constitution', ['President', 'Congress', 'Supreme Court']],
    ['What is the study of how people use resources?', 'Economics', ['Geography', 'History', 'Politics']],
    ['What is the capital of Japan?', 'Tokyo', ['Osaka', 'Kyoto', 'Nagoya']],
    ['What is the capital of China?', 'Beijing', ['Shanghai', 'Guangzhou', 'Shenzhen']],
    ['What is the largest ocean?', 'Pacific', ['Atlantic', 'Indian', 'Arctic']],
    ['What is the tallest mountain on Earth?', 'Mount Everest', ['K2', 'Kilimanjaro', 'Fuji']],
    ['What was the bloodless revolution in 1986 called?', 'EDSA People Power', ['Cry of Pugad Lawin', 'Bataan Death March', 'Cavite Mutiny']],
    ['Who was the first female president of the Philippines?', 'Corazon Aquino', ['Gloria Arroyo', 'Imelda Marcos', 'Leni Robredo']],
  ];
  socialStudies.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Duplicate and expand with more general knowledge questions
  const generalKnowledge: [string, string, string[]][] = [
    ['What is the capital of the Philippines?', 'Manila', ['Cebu', 'Davao', 'Quezon City']],
    ['What is the national flower of the Philippines?', 'Sampaguita', ['Rose', 'Ilang-ilang', 'Waling-waling']],
    ['What is the national bird of the Philippines?', 'Philippine Eagle', ['Maya', 'Rooster', 'Parrot']],
    ['What is the national tree of the Philippines?', 'Narra', ['Acacia', 'Balete', 'Kawayan']],
    ['What is the national fruit of the Philippines?', 'Mangga', ['Saging', 'Niyog', 'Pinya']],
    ['What is the national sport of the Philippines?', 'Arnis', ['Basketball', 'Sipa', 'Boxing']],
    ['What is the national anthem of the Philippines?', 'Lupang Hinirang', ['Bayang Magiliw', 'Pilipinas Kong Mahal', 'Ako ay Pilipino']],
    ['Who wrote "Noli Me Tangere"?', 'Jose Rizal', ['Andres Bonifacio', 'Apolinario Mabini', 'Graciano Lopez Jaena']],
    ['Who founded the Katipunan?', 'Andres Bonifacio', ['Jose Rizal', 'Emilio Aguinaldo', 'Marcelo del Pilar']],
    ['When did the Philippines declare independence?', 'June 12, 1898', ['July 4, 1946', 'August 21, 1983', 'December 30, 1896']],
  ];
  generalKnowledge.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== TVL ================================================

function tvlQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const ict: [string, string, string[]][] = [
    ['What does ICT stand for?', 'Information and Communication Technology', ['Internet and Computer Technology', 'International Communication Tech', 'Integrated Computer Technology']],
    ['What does CPU stand for?', 'Central Processing Unit', ['Computer Personal Unit', 'Central Process Unit', 'Computer Processing Unit']],
    ['What does RAM stand for?', 'Random Access Memory', ['Read Access Memory', 'Random Access Module', 'Read Access Module']],
    ['What does ROM stand for?', 'Read Only Memory', ['Random Only Memory', 'Read Output Memory', 'Random Output Memory']],
    ['What does URL stand for?', 'Uniform Resource Locator', ['Universal Resource Locator', 'Uniform Reference Locator', 'Universal Reference Locator']],
    ['What does HTTP stand for?', 'HyperText Transfer Protocol', ['HyperText Transmission Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Text Protocol']],
    ['What does WWW stand for?', 'World Wide Web', ['World Web Wide', 'Web World Wide', 'Wide World Web']],
    ['What is the brain of a computer?', 'CPU', ['RAM', 'ROM', 'Hard drive']],
    ['What stores data permanently?', 'Hard drive', ['RAM', 'CPU', 'Cache']],
    ['What stores data temporarily?', 'RAM', ['Hard drive', 'CPU', 'ROM']],
    ['What is the software that manages a computer?', 'Operating system', ['Application', 'Driver', 'Utility']],
    ['What is the most common operating system?', 'Windows', ['Linux', 'macOS', 'Android']],
    ['What is open-source software?', 'Software with freely available source code', ['Paid software', 'Closed software', 'Proprietary software']],
    ['What is a computer virus?', 'Malicious software', ['Helpful software', 'Hardware', 'Operating system']],
    ['What is an IP address?', 'Internet Protocol address', ['Internet Provider address', 'Internal Protocol address', 'Internet Protocol adapter']],
    ['What is HTML?', 'HyperText Markup Language', ['HyperText Transfer Markup Language', 'High Transfer Markup Language', 'Hyper Transfer Markup Language']],
    ['What is CSS?', 'Cascading Style Sheets', ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading System Sheets']],
    ['What is a database?', 'Organized collection of data', ['Random data', 'Unorganized data', 'No data']],
    ['What is a network?', 'Group of connected computers', ['One computer', 'No computers', 'A type of software']],
    ['What is the internet?', 'Global network of computers', ['One computer', 'A type of software', 'A type of hardware']],
  ];
  ict.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const cooking: [string, string, string[]][] = [
    ['What do you call the process of cooking food in hot oil?', 'Frying', ['Boiling', 'Baking', 'Steaming']],
    ['What do you call the process of cooking food in water?', 'Boiling', ['Frying', 'Baking', 'Steaming']],
    ['What do you call the process of cooking food in an oven?', 'Baking', ['Frying', 'Boiling', 'Steaming']],
    ['What do you call the process of cooking food with steam?', 'Steaming', ['Frying', 'Boiling', 'Baking']],
    ['What do you call the process of cooking food over an open flame?', 'Grilling', ['Frying', 'Boiling', 'Baking']],
    ['What is the main ingredient in bread?', 'Flour', ['Sugar', 'Salt', 'Water']],
    ['What is the main ingredient in cake?', 'Flour', ['Sugar', 'Eggs', 'Butter']],
    ['What is the main ingredient in soup?', 'Liquid', ['Salt', 'Pepper', 'Flour']],
    ['What temperature should a refrigerator be set at?', '4°C or below', ['10°C', '20°C', '0°C']],
    ['What temperature should a freezer be set at?', '-18°C or below', ['0°C', '4°C', '10°C']],
    ['What is the danger zone for food temperature?', '4°C to 60°C', ['0°C to 4°C', '60°C to 100°C', '10°C to 20°C']],
    ['How long can food be left at room temperature?', '2 hours max', ['1 hour', '4 hours', '8 hours']],
    ['What is the first step in washing dishes?', 'Scrape off food', ['Rinse', 'Soap', 'Dry']],
    ['What is the proper way to hold a knife?', 'Pinch the blade', ['Hold the handle only', 'Hold the blade only', 'Any way']],
    ['What is mise en place?', 'Everything in its place', ['A type of food', 'A type of knife', 'A type of pan']],
  ];
  cooking.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const agriculture: [string, string, string[]][] = [
    ['What do you call the science of farming?', 'Agriculture', ['Biology', 'Botany', 'Geology']],
    ['What is the main crop grown in the Philippines?', 'Rice', ['Wheat', 'Corn', 'Barley']],
    ['What is the process of preparing soil for planting?', 'Tilling', ['Harvesting', 'Watering', 'Fertilizing']],
    ['What is the process of gathering crops?', 'Harvesting', ['Tilling', 'Planting', 'Watering']],
    ['What is the process of adding nutrients to soil?', 'Fertilizing', ['Tilling', 'Harvesting', 'Planting']],
    ['What is the process of supplying water to crops?', 'Irrigation', ['Tilling', 'Harvesting', 'Fertilizing']],
    ['What is the process of removing weeds?', 'Weeding', ['Tilling', 'Harvesting', 'Planting']],
    ['What is the process of planting seeds?', 'Sowing', ['Tilling', 'Harvesting', 'Watering']],
    ['What is the process of growing plants from seeds?', 'Germination', ['Tilling', 'Harvesting', 'Fertilizing']],
    ['What is the process of growing plants without soil?', 'Hydroponics', ['Tilling', 'Harvesting', 'Fertilizing']],
    ['What do you call a young plant?', 'Seedling', ['Seed', 'Tree', 'Branch']],
    ['What do you call the main root of a plant?', 'Taproot', ['Fibrous root', 'Adventitious root', 'Aerial root']],
    ['What do you call a plant that lives for one year?', 'Annual', ['Biennial', 'Perennial', 'Ephemeral']],
    ['What do you call a plant that lives for two years?', 'Biennial', ['Annual', 'Perennial', 'Ephemeral']],
    ['What do you call a plant that lives for many years?', 'Perennial', ['Annual', 'Biennial', 'Ephemeral']],
  ];
  agriculture.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const electronics: [string, string, string[]][] = [
    ['What is a circuit?', 'Path for electric current', ['A type of switch', 'A type of wire', 'A type of battery']],
    ['What is a resistor?', 'Component that resists current', ['Component that creates current', 'Component that stores current', 'Component that measures current']],
    ['What is a capacitor?', 'Component that stores charge', ['Component that resists current', 'Component that creates current', 'Component that measures current']],
    ['What is an inductor?', 'Component that stores energy in a magnetic field', ['Component that stores charge', 'Component that resists current', 'Component that creates current']],
    ['What is a transistor?', 'Semiconductor that amplifies or switches', ['A type of resistor', 'A type of capacitor', 'A type of inductor']],
    ['What is a diode?', 'Component that allows current in one direction', ['Component that allows current in both directions', 'Component that blocks all current', 'Component that creates current']],
    ['What is an LED?', 'Light Emitting Diode', ['Light Energy Device', 'Low Energy Display', 'Light Emitting Display']],
    ['What is AC?', 'Alternating Current', ['Active Current', 'Actual Current', 'Alternating Charge']],
    ['What is DC?', 'Direct Current', ['Digital Current', 'Direct Charge', 'Daily Current']],
    ['What is the unit of electric current?', 'Ampere', ['Volt', 'Ohm', 'Watt']],
    ['What is the unit of voltage?', 'Volt', ['Ampere', 'Ohm', 'Watt']],
    ['What is the unit of resistance?', 'Ohm', ['Ampere', 'Volt', 'Watt']],
    ['What is Ohm\'s law?', 'V = IR', ['V = I/R', 'V = R/I', 'V = IR²']],
    ['What is a series circuit?', 'Components in one path', ['Components in multiple paths', 'Components with no path', 'Components in any path']],
    ['What is a parallel circuit?', 'Components in multiple paths', ['Components in one path', 'Components with no path', 'Components in any path']],
  ];
  electronics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const automotive: [string, string, string[]][] = [
    ['What makes a car move?', 'Engine', ['Wheels', 'Steering wheel', 'Seats']],
    ['What provides power to start the engine?', 'Battery', ['Tires', 'Radiator', 'Alternator']],
    ['What cools the engine?', 'Radiator', ['Battery', 'Tires', 'Brakes']],
    ['What stops the car?', 'Brakes', ['Engine', 'Radiator', 'Battery']],
    ['What provides spark to ignite fuel?', 'Spark plug', ['Battery', 'Radiator', 'Alternator']],
    ['What charges the battery while driving?', 'Alternator', ['Radiator', 'Spark plug', 'Starter']],
    ['What mixes air and fuel?', 'Carburetor', ['Radiator', 'Alternator', 'Starter']],
    ['What lubricates engine parts?', 'Oil', ['Water', 'Gasoline', 'Air']],
    ['What type of energy does a car battery store?', 'Chemical energy', ['Kinetic', 'Potential', 'Thermal']],
    ['What is the purpose of a transmission?', 'Transfer power to wheels', ['Cool the engine', 'Charge the battery', 'Stop the car']],
  ];
  automotive.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== ARTS AND DESIGN ====================================

function artsDesignQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const visualArts: [string, string, string[]][] = [
    ['What are the primary colors?', 'Red, blue, yellow', ['Green, orange, purple', 'Black, white, gray', 'Red, green, blue']],
    ['What do you get when you mix red and blue?', 'Purple', ['Green', 'Orange', 'Brown']],
    ['What do you get when you mix red and yellow?', 'Orange', ['Green', 'Purple', 'Brown']],
    ['What do you get when you mix blue and yellow?', 'Green', ['Orange', 'Purple', 'Brown']],
    ['What do you get when you mix all primary colors?', 'Brown', ['White', 'Black', 'Gray']],
    ['What are complementary colors?', 'Opposite on the color wheel', ['Next to each other', 'Same color', 'Primary colors']],
    ['What are analogous colors?', 'Next to each other on the color wheel', ['Opposite each other', 'Same color', 'Primary colors']],
    ['What is the lightness or darkness of a color?', 'Value', ['Hue', 'Intensity', 'Saturation']],
    ['What is the pure color called?', 'Hue', ['Value', 'Intensity', 'Saturation']],
    ['What is the brightness of a color?', 'Intensity', ['Hue', 'Value', 'Tone']],
    ['Who painted the Mona Lisa?', 'Leonardo da Vinci', ['Michelangelo', 'Raphael', 'Donatello']],
    ['Who painted The Scream?', 'Edvard Munch', ['Vincent van Gogh', 'Pablo Picasso', 'Salvador Dali']],
    ['Who painted Starry Night?', 'Vincent van Gogh', ['Edvard Munch', 'Pablo Picasso', 'Salvador Dali']],
    ['Who painted Guernica?', 'Pablo Picasso', ['Vincent van Gogh', 'Edvard Munch', 'Salvador Dali']],
    ['Who painted The Persistence of Memory?', 'Salvador Dali', ['Pablo Picasso', 'Vincent van Gogh', 'Edvard Munch']],
  ];
  visualArts.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const artHistory: [string, string, string[]][] = [
    ['What is the oldest known form of art?', 'Cave painting', ['Photography', 'Film', 'Digital art']],
    ['Where are the oldest cave paintings found?', 'Indonesia', ['France', 'Spain', 'Egypt']],
    ['What is the most famous cave painting site in France?', 'Lascaux', ['Altamira', 'Chauvet', 'Magura']],
    ['What is the most famous cave painting site in Spain?', 'Altamira', ['Lascaux', 'Chauvet', 'Magura']],
    ['What is the most famous Philippine painting?', 'Spoliarium', ['Bayanihan', 'Mona Lisa', 'The Scream']],
    ['What art movement is Salvador Dali associated with?', 'Surrealism', ['Cubism', 'Impressionism', 'Realism']],
    ['What art movement is Pablo Picasso associated with?', 'Cubism', ['Surrealism', 'Impressionism', 'Realism']],
    ['What art movement is Claude Monet associated with?', 'Impressionism', ['Cubism', 'Surrealism', 'Realism']],
    ['What art movement is Michelangelo associated with?', 'Renaissance', ['Cubism', 'Surrealism', 'Impressionism']],
    ['What art movement is Andy Warhol associated with?', 'Pop Art', ['Cubism', 'Surrealism', 'Impressionism']],
  ];
  artHistory.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const designPrinciples: [string, string, string[]][] = [
    ['What is balance in design?', 'Distribution of visual weight', ['Distribution of color', 'Distribution of size', 'Distribution of shape']],
    ['What is contrast in design?', 'Difference between elements', ['Similarity between elements', 'No difference', 'Same elements']],
    ['What is emphasis in design?', 'Creating a focal point', ['Creating many points', 'No focal point', 'Random points']],
    ['What is rhythm in design?', 'Repetition of elements', ['Random elements', 'No elements', 'One element']],
    ['What is unity in design?', 'All parts work together', ['Parts work separately', 'No parts', 'Random parts']],
    ['What is proportion in design?', 'Size relationship between elements', ['Color relationship', 'Shape relationship', 'No relationship']],
    ['What is variety in design?', 'Use of different elements', ['Use of same elements', 'No elements', 'One element']],
    ['What is harmony in design?', 'Pleasing combination of elements', ['Unpleasing combination', 'Random combination', 'No combination']],
    ['What is movement in design?', 'Path the eye follows', ['Path the hand follows', 'No path', 'Random path']],
    ['What is pattern in design?', 'Repetition of design', ['One design', 'No design', 'Random design']],
  ];
  designPrinciples.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const music: [string, string, string[]][] = [
    ['What do you call the highness or lowness of a sound?', 'Pitch', ['Volume', 'Tone', 'Rhythm']],
    ['What do you call the loudness or softness of a sound?', 'Dynamics', ['Pitch', 'Tone', 'Rhythm']],
    ['What do you call the pattern of beats in music?', 'Rhythm', ['Pitch', 'Dynamics', 'Melody']],
    ['What do you call a sequence of single notes in music?', 'Melody', ['Rhythm', 'Harmony', 'Dynamics']],
    ['What do you call two or more notes played together?', 'Chord', ['Melody', 'Rhythm', 'Pitch']],
    ['How many beats does a whole note get?', '4', ['1', '2', '3']],
    ['How many beats does a half note get?', '2', ['1', '3', '4']],
    ['How many beats does a quarter note get?', '1', ['2', '3', '4']],
    ['How many lines are on a musical staff?', '5', ['4', '6', '7']],
    ['What clef is used for high-pitched instruments?', 'Treble clef', ['Bass clef', 'Alto clef', 'Tenor clef']],
  ];
  music.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const performingArts: [string, string, string[]][] = [
    ['What is theater?', 'Art of performing live', ['Art of painting', 'Art of writing', 'Art of dancing']],
    ['What is dance?', 'Art of moving to music', ['Art of painting', 'Art of writing', 'Art of singing']],
    ['What is acting?', 'Art of portraying a character', ['Art of painting', 'Art of writing', 'Art of dancing']],
    ['What is a play?', 'Story performed on stage', ['A story in a book', 'A story on film', 'A story in a song']],
    ['What is a musical?', 'Play with singing and dancing', ['A play with no music', 'A film with music', 'A book with music']],
    ['What is choreography?', 'Art of designing dance movements', ['Art of designing sets', 'Art of designing costumes', 'Art of designing lights']],
    ['What is improvisation?', 'Performing without preparation', ['Performing with preparation', 'Not performing', 'Performing with script']],
    ['What is a monologue?', 'One person speaking', ['Two people speaking', 'A group speaking', 'No one speaking']],
    ['What is a dialogue?', 'Two or more people speaking', ['One person speaking', 'No one speaking', 'A group singing']],
    ['What is blocking in theater?', 'Positioning of actors on stage', ['Blocking the audience', 'Blocking the exit', 'Blocking the view']],
  ];
  performingArts.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== BUILD AND EXPORT =====================================

const GENERATORS: Record<SpecializedTrack, () => QuizQuestion[]> = {
  STEM: stemQuestions,
  HUMSS: humssQuestions,
  ABM: abmQuestions,
  GAS: gasQuestions,
  TVL: tvlQuestions,
  'Arts and Design': artsDesignQuestions,
};

const bankCache: Partial<Record<SpecializedTrack, QuizQuestion[]>> = {};

function buildTrackBank(track: SpecializedTrack): QuizQuestion[] {
  if (bankCache[track]) return bankCache[track]!;
  const bank = GENERATORS[track]();
  bankCache[track] = bank;
  return bank;
}

export function getSpecializedTrackSize(track: SpecializedTrack): number {
  return buildTrackBank(track).length;
}

export function pickSpecializedQuestions(track: SpecializedTrack, count: number): QuizQuestion[] {
  const bank = buildTrackBank(track);
  const n = Math.min(count, bank.length);
  return shuffle(bank).slice(0, n);
}
