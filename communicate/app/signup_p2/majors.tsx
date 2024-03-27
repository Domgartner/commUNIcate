const majors = 
`Accounting
Actuarial Science
Ancient and Medieval History
Anthropology
Archaeology
Architecture
Art History
Astrophysics
Biochemistry
Bioinformatics
Biological Sciences
Biomechanics
Biomedical Engineering
Biomedical Sciences
Business
Business Analytics
Business Technology Management
Cellular, Molecular and Microbial Biology
Chemical Engineering
Chemistry
Civil Engineering
Communication and Media Studies
Community Rehabilitation
Computer Science
Dance
Data Science
Design in City Innovation
Drama
East Asian Language Studies
East Asian Studies
Economics
Education
Electrical Engineering
Energy Engineering
Engineering (common first year)
Engineering Physics
English
Entrepreneurship and Innovation
Environmental Design
Environmental Science
Exercise and Health Physiology
Film Studies
Finance
French
Gender and Sexuality Studies
Geography
Geology
Geomatics Engineering
Geophysics
Global Development Studies
Greek and Roman Studies
Health and Society
History
International Business Strategy
International Indigenous Studies
International Relations
Kinesiology
Landscape Architecture
Language and Culture
Law
Law and Society
Leadership and Coaching
Linguistics
Linguistics and Language
Marketing
Mathematics
Mechanical Engineering
Medicine
Motor and Psychosocial Aspects of Movement
Multidisciplinary Studies
Music
Natural Sciences
Neuroscience
Nursing
Operations Management
Organizational Behaviour and Human Resources
Personal Financial Planning
Philosophy
Physics
Planning
Plant Biology
Political Science
Psychology
Real Estate Studies
Risk Management and Insurance
Risk Management: Insurance and Finance
Social Work
Sociology
Software Engineering
Spanish
Supply Chain Management
Sustainable Systems Engineering
Undeclared (Arts)
Urban Studies
Veterinary Medicine
Visual Studies
Zoology
`

// Split the content by lines and remove any empty lines
const lines = majors.split('\n').filter(line => line.trim() !== '');


// Map the lines to the desired format (assuming you want to keep the same format as in the example)


// Map the lines to the desired format (adding a space between letters and numbers)
export const available_majors: string[] = lines.map(line => {
   const trimmedLine = line.trim();
   return trimmedLine.replace(/([a-zA-Z])(\d)/, "$1 $2"); // Add space between letters and numbers
});
