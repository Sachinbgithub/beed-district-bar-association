export const aboutContent = {
  history: [
    "Beed Bar Association organises advocates practising at the District & Sessions Court, Beed, and works to uphold the dignity of the legal profession in the district.",
    "The Association coordinates with the District Judiciary for smooth court administration, circulates sitting lists and notices, and provides library, ID card, and welfare facilities to enrolled members.",
    "Through CLE seminars, general body meetings, sports, cultural programmes, and social initiatives such as tree plantation, the Bar remains active beyond the courtroom.",
  ],
  objectives: [
    "To protect and promote the rights, privileges, and welfare of advocates practising at Beed.",
    "To maintain professional ethics and dignity of the Bar under the Advocates Act, 1961.",
    "To cooperate with the District Judiciary for efficient administration of justice.",
    "To provide library, e-filing assistance, and other facilities to members.",
    "To organise seminars, workshops, and cultural programmes for professional development.",
    "To assist junior advocates and run welfare schemes for members and their families.",
  ],
  facilities: [
    {
      title: "Law Library",
      text: "Reference books, law journals, AIR, SCC, and local Acts for members.",
      image: "/images/gallery/library.jpg",
    },
    {
      title: "IT / Research Room",
      text: "Computers with internet for case research and document preparation.",
    },
    {
      title: "E-Filing Desk",
      text: "Assistance for e-filing of pleadings and applications before the District Court.",
    },
    {
      title: "Member ID Cards",
      text: "Identity cards issued after verification of enrolment and annual dues.",
    },
    {
      title: "Parking Stickers",
      text: "Vehicle parking stickers for members within court campus allotment.",
    },
    {
      title: "Welfare Fund",
      text: "Medical and death claim assistance as per Association bye-laws.",
    },
  ],
  membership: {
    eligibility:
      "Any advocate enrolled with the Bar Council of Maharashtra & Goa and practising at Beed District Courts may apply for membership.",
    requirements: [
      "Valid enrolment certificate / sanad from the State Bar Council",
      "Two passport-size photographs",
      "Proof of chamber / practice address at Beed",
      "Proposed and seconded by two existing members in good standing",
      "Payment of admission fee and current year’s subscription",
    ],
    fees: [
      { label: "Admission / enrolment fee", amount: "₹2,000" },
      { label: "Annual subscription", amount: "₹1,500" },
      { label: "Junior advocate (first 3 years)", amount: "₹750 / year" },
      { label: "ID card charges", amount: "₹200" },
      { label: "Life membership (optional)", amount: "₹25,000" },
    ],
  },
} as const;
