export const DIMENSIONS = {
  CONFIDENCE: "Confidence & Expression",
  SELF_AWARENESS: "Self-Awareness",
  DECISION_MAKING: "Decision-Making Style",
  EMOTIONAL_BALANCE: "Emotional Balance",
  DRIVE: "Drive & Future Orientation"
};

export const QUESTIONS = [
  // --- Confidence & Expression ---
  {
    id: 1,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I feel comfortable sharing my ideas even when they differ from the group's opinion.",
    reverse: false
  },
  {
    id: 2,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I tend to hesitate before speaking up in a crowded room or meeting.",
    reverse: true
  },
  {
    id: 3,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I am confident in my ability to explain complex topics to others clearly.",
    reverse: false
  },
  {
    id: 4,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I worry about how others will judge me when I give a presentation.",
    reverse: true
  },
  {
    id: 5,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I find it easy to start conversations with people I have never met before.",
    reverse: false
  },
  {
    id: 6,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I often feel like my voice isn't heard in group discussions.",
    reverse: true
  },
  {
    id: 7,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I can maintain eye contact easily while expressing my point of view.",
    reverse: false
  },
  {
    id: 8,
    dimension: DIMENSIONS.CONFIDENCE,
    text: "I prefer to let others take the lead in social or academic projects.",
    reverse: true
  },

  // --- Self-Awareness ---
  {
    id: 9,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I can accurately identify the specific emotions I am feeling at any given moment.",
    reverse: false
  },
  {
    id: 10,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I often find myself reacting to situations without understanding why I'm upset.",
    reverse: true
  },
  {
    id: 11,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I am aware of my personal strengths and where I still need to improve.",
    reverse: false
  },
  {
    id: 12,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I struggle to see how my behavior affects the people around me.",
    reverse: true
  },
  {
    id: 13,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I regularly reflect on my past actions to understand my patterns better.",
    reverse: false
  },
  {
    id: 14,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I am often surprised by the feedback others give me about my personality.",
    reverse: true
  },
  {
    id: 15,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I know which environments help me perform at my best.",
    reverse: false
  },
  {
    id: 16,
    dimension: DIMENSIONS.SELF_AWARENESS,
    text: "I find it difficult to describe my own values or what I stand for.",
    reverse: true
  },

  // --- Decision-Making Style ---
  {
    id: 17,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I prefer to gather as much information as possible before making a final choice.",
    reverse: false
  },
  {
    id: 18,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I often make impulsive decisions that I later regret.",
    reverse: true
  },
  {
    id: 19,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I can remain logical and objective even when a decision is high-stakes.",
    reverse: false
  },
  {
    id: 20,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I get overwhelmed when I have too many options to choose from.",
    reverse: true
  },
  {
    id: 21,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I trust my intuition but always back it up with a rational analysis.",
    reverse: false
  },
  {
    id: 22,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I tend to avoid making difficult decisions until the last possible minute.",
    reverse: true
  },
  {
    id: 23,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I consider the long-term consequences of my choices rather than just immediate gains.",
    reverse: false
  },
  {
    id: 24,
    dimension: DIMENSIONS.DECISION_MAKING,
    text: "I find it hard to stick to a decision once I've made it.",
    reverse: true
  },

  // --- Emotional Balance ---
  {
    id: 25,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I can stay calm and composed even when things are going wrong.",
    reverse: false
  },
  {
    id: 26,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "My moods tend to fluctuate significantly throughout the day.",
    reverse: true
  },
  {
    id: 27,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I have effective ways to manage stress when I feel pressured.",
    reverse: false
  },
  {
    id: 28,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I find it difficult to 'bounce back' after experiencing a failure.",
    reverse: true
  },
  {
    id: 29,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I don't let small frustrations ruin my overall productivity.",
    reverse: false
  },
  {
    id: 30,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I often feel anxious about things that haven't happened yet.",
    reverse: true
  },
  {
    id: 31,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I am generally optimistic about how situations will turn out.",
    reverse: false
  },
  {
    id: 32,
    dimension: DIMENSIONS.EMOTIONAL_BALANCE,
    text: "I tend to overthink negative interactions for a long time.",
    reverse: true
  },

  // --- Drive & Future Orientation ---
  {
    id: 33,
    dimension: DIMENSIONS.DRIVE,
    text: "I set clear goals for myself and work consistently to achieve them.",
    reverse: false
  },
  {
    id: 34,
    dimension: DIMENSIONS.DRIVE,
    text: "I find it hard to stay motivated when a task becomes repetitive.",
    reverse: true
  },
  {
    id: 35,
    dimension: DIMENSIONS.DRIVE,
    text: "I am always looking for ways to improve my skills and knowledge.",
    reverse: false
  },
  {
    id: 36,
    dimension: DIMENSIONS.DRIVE,
    text: "I often start new projects but struggle to finish them.",
    reverse: true
  },
  {
    id: 37,
    dimension: DIMENSIONS.DRIVE,
    text: "I have a clear vision of where I want to be in the next few years.",
    reverse: false
  },
  {
    id: 38,
    dimension: DIMENSIONS.DRIVE,
    text: "I tend to do just enough to get by rather than aiming for excellence.",
    reverse: true
  },
  {
    id: 39,
    dimension: DIMENSIONS.DRIVE,
    text: "I am willing to sacrifice short-term comfort for long-term success.",
    reverse: false
  },
  {
    id: 40,
    dimension: DIMENSIONS.DRIVE,
    text: "I feel lost when I don't have a structured plan to follow.",
    reverse: true
  }
];
