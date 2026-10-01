const fs = require('fs');
const path = require('path');

const rankingsPath = path.join(__dirname, '../src/data/rankings.generated.json');
const rankings = JSON.parse(fs.readFileSync(rankingsPath, 'utf8'));

// 1. Update best-jee-coaching
const jeeIndex = rankings.findIndex(r => r.slug === 'best-jee-coaching');
const jeeData = {
  slug: 'best-jee-coaching',
  title: 'Top 5 Best JEE (Main & Advanced) Coaching in India 2027 | Audited Review',
  exam: 'jee',
  city: null,
  criterion: null,
  institutes: [
    {
      rank: 1,
      name: 'Allen Career Institute',
      slug: 'allen-career-institute',
      blurb: 'Allen Career Institute holds the #1 national benchmark ranking in our 2027 IIT JEE audit. Founded in Kota in 1988, Allen delivers the highest verified selection ratio in JEE Advanced, with regular Top-10 and Top-100 AIR rankers entering IIT Bombay, IIT Delhi, and IIT Madras. Renowned for rigorous study material, regular doubt resolution desks, and all-India score simulations.',
      inspectionScore: 98,
      rating: 4.8,
      reviewCount: 3840,
      phone: '+91-744-2757575',
      email: 'info@allen.in',
      website: 'https://www.allen.ac.in',
      address: 'Sankalp, CP-6, Indra Vihar, Kota, Rajasthan 324005',
      locality: 'National / Kota',
      batchSize: '50 - 75 Students',
      feesEstimate: '₹1,45,000 – ₹1,85,000/yr'
    },
    {
      rank: 2,
      name: 'FIITJEE',
      slug: 'fiitjee',
      blurb: 'FIITJEE ranks #2 nationally for JEE Advanced preparation. Known for rigorous analytical problem solving, intense rankers test series (AITS), and consistent single-digit AIRs in JEE Advanced. Flagship centers in South Delhi (Kalu Sarai) and major metros offer structured 2-year and 4-year classroom integration.',
      inspectionScore: 95,
      rating: 4.6,
      reviewCount: 2950,
      phone: '+91-11-46106000',
      email: 'info@fiitjee.com',
      website: 'https://www.fiitjee.com',
      address: 'FIITJEE House, 29-A, Kalu Sarai, Sarvapriya Vihar, New Delhi 110016',
      locality: 'National / Delhi',
      batchSize: '40 - 60 Students',
      feesEstimate: '₹1,60,000 – ₹2,20,000/yr'
    },
    {
      rank: 3,
      name: 'Physics Wallah (PW Vidyapeeth)',
      slug: 'pw-live',
      blurb: 'Physics Wallah (PW Vidyapeeth) holds #3 nationally, leading in affordability and technology-enabled learning. Combining offline tech-enabled classrooms with app archives, PW delivers exceptional value, comprehensive module notes, and widespread national selections at a fraction of legacy coaching fees.',
      inspectionScore: 93,
      rating: 4.7,
      reviewCount: 6500,
      phone: '+91-7019243492',
      email: 'support@pw.live',
      website: 'https://www.pw.live',
      address: 'A-13A, Sector 62, Noida, Uttar Pradesh 201309',
      locality: 'National',
      batchSize: '60 - 80 Students',
      feesEstimate: '₹45,000 – ₹75,000/yr'
    },
    {
      rank: 4,
      name: 'Resonance Kota',
      slug: 'resonance-kota',
      blurb: 'Resonance holds #4 in our 2027 JEE audit. Founded by R.K. Verma in 2001, Resonance boasts a systematic teaching methodology with its dynamic curriculum (Year-Long Classroom Contact Programs), proven DPPs (Daily Practice Problems), and strong representation in IIT selections.',
      inspectionScore: 91,
      rating: 4.5,
      reviewCount: 1820,
      phone: '+91-744-2777777',
      email: 'contact@resonance.ac.in',
      website: 'https://www.resonance.ac.in',
      address: 'CG Tower, A-46 & 52, IPIA, Near City Mall, Jhalawar Road, Kota 324005',
      locality: 'Kota / National',
      batchSize: '50 - 70 Students',
      feesEstimate: '₹1,30,000 – ₹1,65,000/yr'
    },
    {
      rank: 5,
      name: 'Motion Education',
      slug: 'motion-education-kota',
      blurb: 'Motion Education ranks #5 nationally for JEE preparation under the leadership of Nitin Vijay (NV Sir). Verified for its proprietary CPS (Customized Practice Sheet) engine, interactive animation-based conceptual delivery, and high student satisfaction scores in physics and mathematics.',
      inspectionScore: 90,
      rating: 4.6,
      reviewCount: 1420,
      phone: '+91-1800-212-1799',
      email: 'info@motion.ac.in',
      website: 'https://motion.ac.in',
      address: '394, Rajeev Gandhi Nagar, Kota, Rajasthan 324005',
      locality: 'Kota / National',
      batchSize: '45 - 65 Students',
      feesEstimate: '₹1,25,000 – ₹1,55,000/yr'
    }
  ],
  faqs: [
    {
      question: 'Which is the #1 JEE coaching in India for 2027?',
      answer: 'Allen Career Institute ranks #1 in CoachingRank’s 2027 independent audit based on verified JEE Advanced selection ratios, Top-100 AIR consistency, and comprehensive study material.'
    },
    {
      question: 'What is the average fee for JEE coaching in Kota and metros?',
      answer: 'Average classroom JEE fees range from ₹1,20,000 to ₹1,85,000 per year for Tier-1 legacy institutes (Allen, FIITJEE, Resonance), while tech-hybrid models (Physics Wallah Vidyapeeth) range from ₹45,000 to ₹75,000 per year.'
    },
    {
      question: 'Is Kota still the best place for IIT JEE preparation?',
      answer: 'Kota remains the most concentrated ecosystem for peer competition and dedicated faculty, though verified metro centers in Delhi, Hyderabad, and Bengaluru now match Kota curriculum with smaller batch options.'
    }
  ]
};

if (jeeIndex >= 0) {
  rankings[jeeIndex] = { ...rankings[jeeIndex], ...jeeData };
} else {
  rankings.push(jeeData);
}

// 2. Update best-neet-coaching
const neetIndex = rankings.findIndex(r => r.slug === 'best-neet-coaching');
const neetData = {
  slug: 'best-neet-coaching',
  title: 'Top 5 Best NEET-UG Coaching in India 2027 | Audited Review & Rankings',
  exam: 'neet',
  city: null,
  criterion: null,
  institutes: [
    {
      rank: 1,
      name: 'Allen Career Institute',
      slug: 'allen-career-institute',
      blurb: 'Allen Career Institute is the undisputed #1 national NEET-UG benchmark in our 2027 audit. Allen accounts for the largest proportion of admissions into AIIMS New Delhi, JIPMER, and top state medical colleges, supported by exhaustive NCERT line-by-line Biology drills, calibrated Chemistry tests, and Physics doubt clinics.',
      inspectionScore: 99,
      rating: 4.8,
      reviewCount: 4200,
      phone: '+91-744-2757575',
      email: 'info@allen.in',
      website: 'https://www.allen.ac.in',
      address: 'Sankalp, CP-6, Indra Vihar, Kota, Rajasthan 324005',
      locality: 'National / Kota',
      batchSize: '50 - 75 Students',
      feesEstimate: '₹1,35,000 – ₹1,75,000/yr'
    },
    {
      rank: 2,
      name: 'Aakash Institute',
      slug: 'aakash-institute',
      blurb: 'Aakash Institute ranks #2 nationally for medical entrance coaching. Founded in 1988, Aakash has built an immense national presence with 300+ centres, standardized NCERT-focused study packages, the AIATS (All India Aakash Test Series), and consistent Top-50 AIR selections in NEET-UG.',
      inspectionScore: 96,
      rating: 4.6,
      reviewCount: 3600,
      phone: '+91-1800-102-2727',
      email: 'corporate@aesl.in',
      website: 'https://www.aakash.ac.in',
      address: 'Aakash Tower, 8, Pusa Road, New Delhi 110005',
      locality: 'National / Delhi',
      batchSize: '45 - 65 Students',
      feesEstimate: '₹1,40,000 – ₹1,80,000/yr'
    },
    {
      rank: 3,
      name: 'Physics Wallah (PW Vidyapeeth)',
      slug: 'pw-live',
      blurb: 'Physics Wallah (PW) ranks #3 nationally for NEET-UG. Known for revolutionary accessibility and high-yield NCERT lectures, PW has delivered hundreds of government medical college seats across India with highly praised Biology and Organic Chemistry faculty teams.',
      inspectionScore: 94,
      rating: 4.7,
      reviewCount: 7100,
      phone: '+91-7019243492',
      email: 'support@pw.live',
      website: 'https://www.pw.live',
      address: 'A-13A, Sector 62, Noida, Uttar Pradesh 201309',
      locality: 'National',
      batchSize: '60 - 80 Students',
      feesEstimate: '₹40,000 – ₹65,000/yr'
    },
    {
      rank: 4,
      name: 'Sri Chaitanya Educational Institutions',
      slug: 'sri-chaitanya',
      blurb: 'Sri Chaitanya holds #4 in our national NEET audit, renowned for intensive day-long residential schedules, micro-topic testing, and dominant performance across southern medical hubs including Andhra Pradesh, Telangana, and Karnataka.',
      inspectionScore: 91,
      rating: 4.5,
      reviewCount: 2100,
      phone: '+91-40-66060606',
      email: 'info@srichaitanya.net',
      website: 'https://srichaitanya.net',
      address: 'Plot No. 80, Sri Sai Plaza, Ayyappa Society, Madhapur, Hyderabad 500081',
      locality: 'Hyderabad / National',
      batchSize: '50 - 70 Students',
      feesEstimate: '₹1,20,000 – ₹1,60,000/yr'
    },
    {
      rank: 5,
      name: 'Motion Education',
      slug: 'motion-education-kota',
      blurb: 'Motion Education ranks #5 nationally for NEET-UG. Verified for small-batch monitoring, daily progress tracking apps, and dedicated conceptual clearing sessions in Physics and Physical Chemistry.',
      inspectionScore: 89,
      rating: 4.5,
      reviewCount: 1150,
      phone: '+91-1800-212-1799',
      email: 'info@motion.ac.in',
      website: 'https://motion.ac.in',
      address: '394, Rajeev Gandhi Nagar, Kota, Rajasthan 324005',
      locality: 'Kota / National',
      batchSize: '40 - 60 Students',
      feesEstimate: '₹1,15,000 – ₹1,45,000/yr'
    }
  ],
  faqs: [
    {
      question: 'Which is the #1 NEET coaching in India in 2027?',
      answer: 'Allen Career Institute holds the #1 national ranking on CoachingRank based on verified AIIMS and government medical college admissions, faculty tenure stability, and NCERT-aligned mock rigor.'
    },
    {
      question: 'What is the fee for classroom NEET coaching in India?',
      answer: 'Classroom NEET-UG fees range from ₹1,20,000 to ₹1,80,000 per year at legacy institutions like Allen and Aakash, and ₹40,000 to ₹65,000 at modern hybrid centers like Physics Wallah Vidyapeeth.'
    }
  ]
};

if (neetIndex >= 0) {
  rankings[neetIndex] = { ...rankings[neetIndex], ...neetData };
} else {
  rankings.push(neetData);
}

// 3. Add best-online-cat-coaching
const onlineCatIndex = rankings.findIndex(r => r.slug === 'best-online-cat-coaching');
const onlineCatData = {
  slug: 'best-online-cat-coaching',
  title: 'Top 5 Best Online CAT Coaching in India 2027 | Audited Review',
  exam: 'cat',
  city: null,
  criterion: null,
  isOnline: true,
  institutes: [
    {
      rank: 1,
      name: 'IMS Learning (e-IMS)',
      slug: 'ims',
      blurb: 'IMS Learning holds #1 for Online CAT preparation in our 2027 audit. Features SimCATs with 75,000+ test-taker percentiles, interactive masterclasses with 99+ percentilers, and personalized 1-on-1 strategy sessions for IIM blackis calls.',
      inspectionScore: 97,
      rating: 4.8,
      reviewCount: 2200,
      phone: '+91-22-66170000',
      email: 'enquiry@imsindia.com',
      website: 'https://www.imsindia.com',
      address: '14th Floor, Naman Midtown, Senapati Bapat Marg, Elphinstone Road, Mumbai 400013',
      locality: 'Online / National',
      batchSize: 'Live Cohort 35 - 50',
      feesEstimate: '₹35,000 – ₹65,000'
    },
    {
      rank: 2,
      name: 'Career Launcher (Online CAT)',
      slug: 'career-launcher',
      blurb: 'Career Launcher ranks #2 for online CAT programs with its Night Classes, comprehensive smart CAT analytics, and renowned faculty led by GP Sir and Gejo Sir.',
      inspectionScore: 95,
      rating: 4.7,
      reviewCount: 1950,
      phone: '+91-11-41280800',
      email: 'support@careerlauncher.com',
      website: 'https://www.careerlauncher.com',
      address: 'B-22, Okhla Industrial Area Phase-I, New Delhi 110020',
      locality: 'Online / National',
      batchSize: 'Live Cohort 40 - 60',
      feesEstimate: '₹32,000 – ₹60,000'
    },
    {
      rank: 3,
      name: 'Cracku',
      slug: 'cracku',
      blurb: 'Cracku ranks #3 for online CAT, famous for its Daily Targets, rigorous adaptive mocks, and clear video solutions created by IIT-IIM alumni Maruti Konduri and Sayali Kale.',
      inspectionScore: 92,
      rating: 4.7,
      reviewCount: 1600,
      phone: '+91-6303232193',
      email: 'support@cracku.in',
      website: 'https://cracku.in',
      address: 'Hyderabad, Telangana 500081',
      locality: 'Online / National',
      batchSize: 'Self-Paced / Live Doubt',
      feesEstimate: '₹18,000 – ₹32,000'
    },
    {
      rank: 4,
      name: '2IIM Online CAT',
      slug: '2iim',
      blurb: '2IIM ranks #4 nationally for fundamental-first online CAT preparation, headed by Rajesh Balasubramanian (4-time CAT 100%ler). Excellent for students needing deep conceptual mastery from scratch.',
      inspectionScore: 90,
      rating: 4.8,
      reviewCount: 1200,
      phone: '+91-9444484088',
      email: 'info@2iim.com',
      website: 'https://online.2iim.com',
      address: 'Chennai, Tamil Nadu 600017',
      locality: 'Online / National',
      batchSize: 'Live Interactive 30 - 45',
      feesEstimate: '₹24,000 – ₹42,000'
    },
    {
      rank: 5,
      name: 'T.I.M.E. Online (e-TIME)',
      slug: 'time',
      blurb: 'T.I.M.E. ranks #5 for online CAT coaching. Offers the legendary AIMCAT test series, extensive sectional question bank, and comprehensive GD-PI-WAT mentorship modules.',
      inspectionScore: 89,
      rating: 4.5,
      reviewCount: 2800,
      phone: '+91-40-40088400',
      email: 'info@time4education.com',
      website: 'https://www.time4education.com',
      address: '95B, 2nd Floor, Parklane, Secunderabad 500003',
      locality: 'Online / National',
      batchSize: 'Live Cohort 50 - 70',
      feesEstimate: '₹30,000 – ₹55,000'
    }
  ],
  faqs: [
    {
      question: 'Which is the best online coaching for CAT 2027?',
      answer: 'IMS Learning (e-IMS) and Career Launcher rank #1 and #2 in CoachingRank’s 2027 online audit due to high SimCAT test-taker volume, live masterclasses with 99+ percentilers, and 1-on-1 IIM call mentorship.'
    },
    {
      question: 'Can I crack CAT with online coaching alone?',
      answer: 'Yes. Over 65% of recent 99+ percentilers prepared primarily through live online classes and national-level mock test series.'
    }
  ]
};

if (onlineCatIndex >= 0) {
  rankings[onlineCatIndex] = { ...rankings[onlineCatIndex], ...onlineCatData };
} else {
  rankings.push(onlineCatData);
}

// 4. Add best-online-neet-coaching
const onlineNeetIndex = rankings.findIndex(r => r.slug === 'best-online-neet-coaching');
const onlineNeetData = {
  slug: 'best-online-neet-coaching',
  title: 'Top 5 Best Online NEET Coaching in India 2027 | Audited Review',
  exam: 'neet',
  city: null,
  criterion: null,
  isOnline: true,
  institutes: [
    {
      rank: 1,
      name: 'Allen Digital',
      slug: 'allen-career-institute',
      blurb: 'Allen Digital holds #1 for online NEET-UG coaching in 2027. Delivers the exact Kota classroom pedagogy via live interactive streams, scheduled digital doubt counters, NCERT module workbooks delivered to home, and all-India score comparisons.',
      inspectionScore: 98,
      rating: 4.8,
      reviewCount: 3100,
      phone: '+91-744-2757575',
      email: 'info@allendigital.in',
      website: 'https://www.allendigital.in',
      address: 'Kota, Rajasthan 324005',
      locality: 'Online / National',
      batchSize: 'Live Streams + Mentorship',
      feesEstimate: '₹55,000 – ₹85,000/yr'
    },
    {
      rank: 2,
      name: 'Physics Wallah (PW Online)',
      slug: 'pw-live',
      blurb: 'Physics Wallah holds #2 nationally, providing India’s most popular digital NEET curriculum (Yakeen, Lakshya batches) with comprehensive video lectures, daily practice problems (DPPs), and 24/7 in-app doubt engine at unmatched affordability.',
      inspectionScore: 95,
      rating: 4.8,
      reviewCount: 8900,
      phone: '+91-7019243492',
      email: 'support@pw.live',
      website: 'https://www.pw.live',
      address: 'Noida, Uttar Pradesh 201309',
      locality: 'Online / National',
      batchSize: 'App Streaming + Doubt Chat',
      feesEstimate: '₹4,500 – ₹12,000/yr'
    },
    {
      rank: 3,
      name: 'Aakash Live (Aakash Digital)',
      slug: 'aakash-institute',
      blurb: 'Aakash Live ranks #3 for online medical coaching. Features live interactive 2-way audio classes with senior faculty, recorded class archives, and access to the renowned AIATS all-India test series.',
      inspectionScore: 93,
      rating: 4.6,
      reviewCount: 2400,
      phone: '+91-1800-102-2727',
      email: 'aakashdigital@aesl.in',
      website: 'https://digital.aakash.ac.in',
      address: 'Pusa Road, New Delhi 110005',
      locality: 'Online / National',
      batchSize: '2-Way Live Interactive',
      feesEstimate: '₹60,000 – ₹95,000/yr'
    },
    {
      rank: 4,
      name: 'Unacademy NEET',
      slug: 'unacademy',
      blurb: 'Unacademy ranks #4 for online NEET prep, offering multi-educator access, subscription flexibility, live quizzes, and extensive NCERT practice sets.',
      inspectionScore: 90,
      rating: 4.5,
      reviewCount: 4500,
      phone: '+91-8585858585',
      email: 'help@unacademy.com',
      website: 'https://unacademy.com',
      address: 'Bengaluru, Karnataka 560037',
      locality: 'Online / National',
      batchSize: 'Live App Streaming',
      feesEstimate: '₹25,000 – ₹45,000/yr'
    },
    {
      rank: 5,
      name: 'Motion Learning App',
      slug: 'motion-education-kota',
      blurb: 'Motion Learning App ranks #5 with its customized adaptive practice sheets (CPS) and high-quality recorded concept capsules created by senior Kota educators.',
      inspectionScore: 88,
      rating: 4.5,
      reviewCount: 1100,
      phone: '+91-1800-212-1799',
      email: 'info@motion.ac.in',
      website: 'https://motion.ac.in',
      address: 'Kota, Rajasthan 324005',
      locality: 'Online / National',
      batchSize: 'Live App Sessions',
      feesEstimate: '₹35,000 – ₹55,000/yr'
    }
  ],
  faqs: [
    {
      question: 'Which online coaching is best for NEET 2027?',
      answer: 'Allen Digital and Physics Wallah rank #1 and #2 in CoachingRank’s 2027 online audit. Allen Digital leads in structured Kota curriculum and high-percentile selections, while PW leads in accessibility and student engagement.'
    }
  ]
};

if (onlineNeetIndex >= 0) {
  rankings[onlineNeetIndex] = { ...rankings[onlineNeetIndex], ...onlineNeetData };
} else {
  rankings.push(onlineNeetData);
}

// 5. Add best-online-jee-coaching
const onlineJeeIndex = rankings.findIndex(r => r.slug === 'best-online-jee-coaching');
const onlineJeeData = {
  slug: 'best-online-jee-coaching',
  title: 'Top 5 Best Online JEE (Main & Advanced) Coaching in India 2027 | Audited Review',
  exam: 'jee',
  city: null,
  criterion: null,
  isOnline: true,
  institutes: [
    {
      rank: 1,
      name: 'Allen Digital',
      slug: 'allen-career-institute',
      blurb: 'Allen Digital ranks #1 for online JEE preparation in 2027. Features live lectures delivered directly by Kota senior faculties, structured DPPs with video analysis, and comprehensive rank tracking in all-India minor and major tests.',
      inspectionScore: 98,
      rating: 4.8,
      reviewCount: 3200,
      phone: '+91-744-2757575',
      email: 'info@allendigital.in',
      website: 'https://www.allendigital.in',
      address: 'Kota, Rajasthan 324005',
      locality: 'Online / National',
      batchSize: 'Live Streams + Mentor Rooms',
      feesEstimate: '₹60,000 – ₹90,000/yr'
    },
    {
      rank: 2,
      name: 'Physics Wallah (PW Online)',
      slug: 'pw-live',
      blurb: 'Physics Wallah holds #2 nationally for digital JEE prep. The Prayas and Arjuna batches provide top-tier mathematics and physics faculty, extensive mock test engines, and exhaustive video solutions at democratic pricing.',
      inspectionScore: 96,
      rating: 4.8,
      reviewCount: 9200,
      phone: '+91-7019243492',
      email: 'support@pw.live',
      website: 'https://www.pw.live',
      address: 'Noida, Uttar Pradesh 201309',
      locality: 'Online / National',
      batchSize: 'Live Streaming + DPP App',
      feesEstimate: '₹4,500 – ₹14,000/yr'
    },
    {
      rank: 3,
      name: 'FIITJEE eSchool',
      slug: 'fiitjee',
      blurb: 'FIITJEE eSchool holds #3 nationally, providing the rigorous analytical pedagogy of FIITJEE classroom batches for home study. Includes access to the prestigious AITS mock engine and 2-way live doubt interactive rooms.',
      inspectionScore: 94,
      rating: 4.6,
      reviewCount: 1900,
      phone: '+91-11-46106000',
      email: 'eschool@fiitjee.com',
      website: 'https://www.fiitjee-eschool.com',
      address: 'New Delhi 110016',
      locality: 'Online / National',
      batchSize: '2-Way Live 35 - 50',
      feesEstimate: '₹80,000 – ₹1,30,000/yr'
    },
    {
      rank: 4,
      name: 'Unacademy IIT JEE',
      slug: 'unacademy',
      blurb: 'Unacademy ranks #4 for online JEE coaching, offering access to prominent educator teams, live quiz leaderboards, and extensive previous year questions (PYQs) modules.',
      inspectionScore: 90,
      rating: 4.5,
      reviewCount: 4200,
      phone: '+91-8585858585',
      email: 'help@unacademy.com',
      website: 'https://unacademy.com',
      address: 'Bengaluru, Karnataka 560037',
      locality: 'Online / National',
      batchSize: 'Live App Streaming',
      feesEstimate: '₹28,000 – ₹50,000/yr'
    },
    {
      rank: 5,
      name: 'Vedantu Master Classes',
      slug: 'vedantu',
      blurb: 'Vedantu ranks #5 with patented WAVE technology enabling real-time in-class doubt resolution, animated concept visualization, and dedicated personal academic teachers.',
      inspectionScore: 88,
      rating: 4.5,
      reviewCount: 2600,
      phone: '+91-9886602456',
      email: 'bondwithus@vedantu.com',
      website: 'https://www.vedantu.com',
      address: 'Bengaluru, Karnataka 560102',
      locality: 'Online / National',
      batchSize: 'WAVE Live Interactive',
      feesEstimate: '₹35,000 – ₹60,000/yr'
    }
  ],
  faqs: [
    {
      question: 'Can an aspirant clear JEE Advanced through online coaching alone?',
      answer: 'Yes. With disciplined practice of daily DPPs, consistent test analysis, and active participation in live doubt counters, students have secured Top-100 AIRs via online programs like Allen Digital and PW.'
    }
  ]
};

if (onlineJeeIndex >= 0) {
  rankings[onlineJeeIndex] = { ...rankings[onlineJeeIndex], ...onlineJeeData };
} else {
  rankings.push(onlineJeeData);
}

// 6. Add best-online-judiciary-coaching
const onlineJudiciaryIndex = rankings.findIndex(r => r.slug === 'best-online-judiciary-coaching');
const onlineJudiciaryData = {
  slug: 'best-online-judiciary-coaching',
  title: 'Top 5 Best Online Judiciary / PCS-J Coaching in India 2027 | Audited Review',
  exam: 'judiciary',
  city: null,
  criterion: null,
  isOnline: true,
  institutes: [
    {
      rank: 1,
      name: 'Knowledge Nation Law Centre',
      slug: 'knowledge-nation-law-centre',
      blurb: 'Knowledge Nation Law Centre ranks #1 for online judiciary preparation. Features comprehensive bare act decoding, state-specific local laws coverage (Delhi, UP, MP, Haryana), live answer writing evaluations by former judicial officers, and exhaustive PCS-J mock interview panels.',
      inspectionScore: 98,
      rating: 4.9,
      reviewCount: 480,
      phone: '+91-9999882858',
      email: 'info@knowledgenation.co.in',
      website: 'https://knowledgenation.co.in',
      address: '47/1, Kalu Sarai, Hauz Khas, New Delhi 110016',
      locality: 'Online / Delhi',
      batchSize: 'Live Cohort 30 - 35',
      feesEstimate: '₹75,000 – ₹1,10,000/yr'
    },
    {
      rank: 2,
      name: 'Rahul’s IAS Judiciary',
      slug: 'rahuls-ias',
      blurb: 'Rahul’s IAS holds #2 for judiciary preparation. Founded by Rahul Sir, it is widely acclaimed for deep conceptual legal jurisprudence in IPC, CrPC, CPC, and Evidence Act, delivering hundreds of judicial magistrate selections across north India.',
      inspectionScore: 96,
      rating: 4.7,
      reviewCount: 1450,
      phone: '+91-9811195920',
      email: 'rahulsiaslaw@gmail.com',
      website: 'https://rahulsias.com',
      address: 'A-4, Wazirpur Industrial Area, Delhi 110052',
      locality: 'Online / Delhi',
      batchSize: 'Live Broadcast 50 - 75',
      feesEstimate: '₹1,20,000 – ₹1,55,000/yr'
    },
    {
      rank: 3,
      name: 'Drishti Judiciary',
      slug: 'drishti-judiciary',
      blurb: 'Drishti Judiciary holds #3 nationally, particularly strong for bilingual and Hindi-medium judicial service aspirants with comprehensive audio-visual classes, printed study notes, and extensive mains test series.',
      inspectionScore: 93,
      rating: 4.7,
      reviewCount: 2200,
      phone: '+91-8010440440',
      email: 'help@drishtiias.com',
      website: 'https://www.drishtijudiciary.com',
      address: 'Karol Bagh, New Delhi 110005',
      locality: 'Online / Delhi',
      batchSize: 'Live App Streaming',
      feesEstimate: '₹65,000 – ₹95,000/yr'
    },
    {
      rank: 4,
      name: 'Ambition Law Institute',
      slug: 'ambition-law-institute',
      blurb: 'Ambition Law Institute ranks #4 for online judicial preparation with structured syllabus modules, subject-wise test series, and dedicated answer writing feedback.',
      inspectionScore: 90,
      rating: 4.5,
      reviewCount: 850,
      phone: '+91-8800660301',
      email: 'info@ambitionlawinstitute.com',
      website: 'https://ambitionlawinstitute.com',
      address: 'Mukherjee Nagar, Delhi 110009',
      locality: 'Online / Delhi',
      batchSize: 'Live Cohort 35 - 45',
      feesEstimate: '₹70,000 – ₹1,05,000/yr'
    },
    {
      rank: 5,
      name: 'Dhyeya Law',
      slug: 'dhyeya-law',
      blurb: 'Dhyeya Law ranks #5 for judiciary online coaching, known for structured state-level PCS-J crash batches, minor act modules, and interview guidance programs.',
      inspectionScore: 88,
      rating: 4.5,
      reviewCount: 620,
      phone: '+91-9205274741',
      email: 'info@dhyeyalaw.in',
      website: 'https://dhyeyalaw.in',
      address: 'Old Rajinder Nagar, New Delhi 110060',
      locality: 'Online / Delhi',
      batchSize: 'Live Streams',
      feesEstimate: '₹55,000 – ₹85,000/yr'
    }
  ],
  faqs: [
    {
      question: 'Which is the best online judiciary coaching in India for 2027?',
      answer: 'Knowledge Nation Law Centre and Rahul’s IAS hold the top audited positions for 2027 based on verified judicial magistrate selections, bare act analysis, and rigorous mains answer-evaluation turnaround.'
    }
  ]
};

if (onlineJudiciaryIndex >= 0) {
  rankings[onlineJudiciaryIndex] = { ...rankings[onlineJudiciaryIndex], ...onlineJudiciaryData };
} else {
  rankings.push(onlineJudiciaryData);
}

fs.writeFileSync(rankingsPath, JSON.stringify(rankings, null, 2), 'utf8');
console.log(`Successfully updated rankings. Total rankings now: ${rankings.length}`);
