/// <reference types="react-scripts" />
interface FaqContent {
  title : string
  content : string
}

interface Faq {
  siege: {
    position: FaqContent;
    condition: FaqContent;
    transport: FaqContenting;
    learn : FaqContent
  }
  access: {
    career: FaqContent;
    test: FaqContent;
    level: FaqContenting;
  }
  parcours: {
    formation: FaqContent;
    time: FaqContent;
    learn: FaqContenting;
  }
  frais: {
    money: FaqContent;
    bourse: FaqContent;
    paiement: FaqContenting;
  }
}

interface Field {
  value?: any;
  error?: string;
  isValid?: boolean;
}

interface Admission {
  name: Field;
  mail: Field;
  country: Field;
  city: Field;
  mobile: Field;
  age: Field;
  gender: Field;
  isHandicap: Field;
  handicap: Field;
  coding : Field;
  isLearnCoding: Field;
  adventure: Field;
  whyDoNotLearnCoding: Field;
  learn: Field;
  likeToAchieve : Field;
  techEnvironment: Field;
  validate : Field
}

interface Identity {
  name: Field;
  mail: Field;
  country: Field;
  city: Field;
  mobile: Field;
  age: Field;
  gender: Field;
}

interface IsHandicap {
  isHandicap: Field;
}

interface Handicap {
  handicap: Field;
}

interface Coding {
  coding: Field;
}

interface IsLearnCoding {
  isLearnCoding: Field;
}

interface Adventure {
  adventure: Field;
}

interface WhyDoNotLearnCoding {
  whyDoNotLearnCoding: Field;
}

interface Learn {
  learn: Field;
}

interface LikeToAchieve {
  likeToAchieve: Field;
}

interface TechEnvironment {
  techEnvironment: Field;
}

interface EventSubmit {
  validate : Field
}

interface Contact {
  firstName : Field;
  lastName: Field;
  mail: Field;
  mobile: Field;
  message: Field;
  checkMachine: Field
  calcul: {
    first: number,
    last: number
  }
}

interface Parteners {
  src1 : string
  src2 : string
}