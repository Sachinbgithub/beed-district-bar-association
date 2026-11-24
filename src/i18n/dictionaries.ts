import type { AppLocale } from "@/lib/locale";

const en = {
  nav: {
    about: "About Us",
    members: "Members",
    notices: "Notices",
    events: "Events",
    gallery: "Gallery",
    blog: "Blog",
    contact: "Contact",
    membership: "Membership",
    dashboard: "Dashboard",
    officeBearers: "Office Bearers",
    more: "More",
    login: "Member Login",
    logout: "Sign out",
    admin: "Admin",
    account: "Account",
  },
  common: {
    viewAll: "View All",
    submit: "Submit",
    save: "Save",
    publish: "Publish",
    cancel: "Cancel",
    approve: "Approve",
    reject: "Reject",
    upload: "Upload",
    readMore: "Read more",
    like: "Like",
    comment: "Comment",
    comments: "Comments",
    language: "Language",
  },
  home: {
    memberDirectory: "Member directory",
    latestNotices: "Latest notices",
  },
  auth: {
    loginTitle: "Member login",
    loginHint: "Sign in with email or enrolment number.",
    registerTitle: "Membership application",
    registerHint: "Submit your details. You can sign in only after the Association approves your application.",
    password: "Password",
    signIn: "Sign in",
    apply: "Submit application",
  },
};

type DictionaryShape = {
  [K in keyof typeof en]: { [P in keyof (typeof en)[K]]: string };
};

const mr: DictionaryShape = {
  nav: {
    about: "आमच्याबद्दल",
    members: "सदस्य",
    notices: "सूचना",
    events: "कार्यक्रम",
    gallery: "छायाचित्र",
    blog: "ब्लॉग",
    contact: "संपर्क",
    membership: "सदस्यत्व",
    dashboard: "डॅशबोर्ड",
    officeBearers: "पदाधिकारी",
    more: "अधिक",
    login: "सदस्य लॉगिन",
    logout: "साइन आउट",
    admin: "प्रशासन",
    account: "खाते",
  },
  common: {
    viewAll: "सर्व पहा",
    submit: "सबमिट",
    save: "जतन करा",
    publish: "प्रकाशित करा",
    cancel: "रद्द",
    approve: "मंजूर",
    reject: "नाकार",
    upload: "अपलोड",
    readMore: "अधिक वाचा",
    like: "आवडले",
    comment: "टिप्पणी",
    comments: "टिप्पण्या",
    language: "भाषा",
  },
  home: {
    memberDirectory: "सदस्य यादी",
    latestNotices: "नवीनतम सूचना",
  },
  auth: {
    loginTitle: "सदस्य लॉगिन",
    loginHint: "ईमेल किंवा नोंदणी क्रमांकाने साइन इन करा.",
    registerTitle: "सदस्यत्व अर्ज",
    registerHint: "तपशील भरा. अर्ज मंजूर झाल्यानंतरच लॉगिन करता येईल.",
    password: "पासवर्ड",
    signIn: "साइन इन",
    apply: "अर्ज पाठवा",
  },
};

const hi: DictionaryShape = {
  nav: {
    about: "हमारे बारे में",
    members: "सदस्य",
    notices: "सूचनाएँ",
    events: "कार्यक्रम",
    gallery: "गैलरी",
    blog: "ब्लॉग",
    contact: "संपर्क",
    membership: "सदस्यता",
    dashboard: "डैशबोर्ड",
    officeBearers: "पदाधिकारी",
    more: "और",
    login: "सदस्य लॉगिन",
    logout: "साइन आउट",
    admin: "प्रशासन",
    account: "खाता",
  },
  common: {
    viewAll: "सभी देखें",
    submit: "जमा करें",
    save: "सेव करें",
    publish: "प्रकाशित करें",
    cancel: "रद्द",
    approve: "मंजूर",
    reject: "अस्वीकार",
    upload: "अपलोड",
    readMore: "और पढ़ें",
    like: "पसंद",
    comment: "टिप्पणी",
    comments: "टिप्पणियाँ",
    language: "भाषा",
  },
  home: {
    memberDirectory: "सदस्य निर्देशिका",
    latestNotices: "नवीनतम सूचनाएँ",
  },
  auth: {
    loginTitle: "सदस्य लॉगिन",
    loginHint: "ईमेल या नामांकन संख्या से साइन इन करें।",
    registerTitle: "सदस्यता आवेदन",
    registerHint: "विवरण भरें। आवेदन स्वीकृत होने के बाद ही लॉगिन कर सकेंगे।",
    password: "पासवर्ड",
    signIn: "साइन इन",
    apply: "आवेदन भेजें",
  },
};

const dictionaries: Record<AppLocale, DictionaryShape> = { en, mr, hi };

export type Dictionary = DictionaryShape;

export function getDictionary(locale: AppLocale): Dictionary {
  return dictionaries[locale];
}
