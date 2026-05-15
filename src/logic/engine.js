import { QUESTIONS, DIMENSIONS } from '../data/questions';

/**
 * BEHAVIORAL INTELLIGENCE ENGINE
 * This engine processes raw student responses and generates deep psychological insights.
 */

export const processAssessment = (responses, studentInfo) => {
  // --- LAYER 1 & 2: SCORING ENGINE ---
  const scores = calculateDimensionScores(responses);
  
  // --- LAYER 3: CONSISTENCY ENGINE ---
  const reliability = calculateReliability(responses);
  
  // --- LAYER 4: LATENT TRAIT ENGINE ---
  const latentTraits = calculateLatentTraits(scores);
  
  // --- LAYER 5: PATTERN ENGINE ---
  const patterns = detectPatterns(scores);
  
  // --- LAYER 6: RISK ENGINE ---
  const risks = detectRisks(scores, patterns);
  
  // --- LAYER 7: ARCHETYPE ENGINE ---
  const archetype = determineArchetype(scores, patterns);
  
  // --- LAYER 8 & 9: NARRATIVE & EXPLAINABILITY ENGINE ---
  const report = generateNarrativeReport(scores, latentTraits, patterns, risks, archetype, studentInfo);

  return {
    studentInfo,
    scores,
    reliability,
    latentTraits,
    patterns,
    risks,
    archetype,
    report
  };
};

/**
 * Layer 1 & 2: Dimension Scoring
 */
const calculateDimensionScores = (responses) => {
  const dimensionData = {};

  // Initialize
  Object.values(DIMENSIONS).forEach(dim => {
    dimensionData[dim] = { raw: 0, count: 0, questions: [] };
  });

  // Process responses
  responses.forEach(resp => {
    const question = QUESTIONS.find(q => q.id === resp.questionId);
    if (!question) return;

    let value = resp.value; // 1-5
    if (question.reverse) {
      value = 6 - value; // Reverse scoring (Layer 1)
    }

    dimensionData[question.dimension].raw += value;
    dimensionData[question.dimension].count += 1;
    dimensionData[question.dimension].questions.push({ ...question, responseValue: value });
  });

  // Normalize and calculate percentiles (Layer 2)
  const finalScores = {};
  Object.entries(dimensionData).forEach(([dim, data]) => {
    const average = data.raw / data.count;
    const percentile = Math.round(((average - 1) / 4) * 100);
    
    let band = "Developing";
    if (percentile <= 25) band = "Initial";
    else if (percentile <= 55) band = "Developing";
    else if (percentile <= 80) band = "Strong";
    else band = "Exemplary";

    finalScores[dim] = {
      score: average.toFixed(2),
      percentile,
      band,
      label: dim
    };
  });

  return finalScores;
};

/**
 * Layer 3: Consistency Engine
 */
const calculateReliability = (responses) => {
  // Simple check: looking for extreme consistency or contradictions
  // In a real app, we'd compare paired questions. 
  // Here we'll check if standard deviation is too low (random) or if they hit the same button 40 times.
  const values = responses.map(r => r.value);
  const uniqueValues = new Set(values).size;
  
  if (uniqueValues === 1) return { level: "Low", reason: "Static responding detected." };
  if (uniqueValues === 2) return { level: "Medium", reason: "Limited variance in responses." };
  return { level: "High", reason: "Thoughtful response pattern." };
};

/**
 * Layer 4: Latent Trait Engine
 */
const calculateLatentTraits = (scores) => {
  const s = (dim) => scores[dim].percentile / 100;

  return [
    {
      name: "Resilience",
      value: Math.round((s(DIMENSIONS.EMOTIONAL_BALANCE) * 0.6 + s(DIMENSIONS.DRIVE) * 0.4) * 100),
      description: "Ability to recover from setbacks and maintain momentum."
    },
    {
      name: "Leadership Potential",
      value: Math.round((s(DIMENSIONS.CONFIDENCE) * 0.4 + s(DIMENSIONS.DECISION_MAKING) * 0.4 + s(DIMENSIONS.DRIVE) * 0.2) * 100),
      description: "Propensity to guide others and take initiative."
    },
    {
      name: "Emotional Maturity",
      value: Math.round((s(DIMENSIONS.SELF_AWARENESS) * 0.5 + s(DIMENSIONS.EMOTIONAL_BALANCE) * 0.5) * 100),
      description: "Level of internal stability and self-understanding."
    },
    {
      name: "Social Adaptability",
      value: Math.round((s(DIMENSIONS.CONFIDENCE) * 0.5 + s(DIMENSIONS.SELF_AWARENESS) * 0.5) * 100),
      description: "Ease of navigating social dynamics and self-expression."
    }
  ];
};

/**
 * Layer 5: Pattern Engine (Cross-Dimension)
 */
const detectPatterns = (scores) => {
  const patterns = [];
  const p = (dim) => scores[dim].percentile;

  // Patterns
  if (p(DIMENSIONS.SELF_AWARENESS) > 70 && p(DIMENSIONS.CONFIDENCE) < 40) {
    patterns.push({
      id: 'reflective_hesitant',
      title: "Reflective Observer",
      description: "High internal awareness but hesitant external expression. You understand situations deeply but may wait for permission to speak."
    });
  }

  if (p(DIMENSIONS.DRIVE) > 75 && p(DIMENSIONS.EMOTIONAL_BALANCE) < 45) {
    patterns.push({
      id: 'achievement_pressure',
      title: "High-Octane Performer",
      description: "Significant drive for success which may create internal emotional pressure or stress."
    });
  }

  if (p(DIMENSIONS.CONFIDENCE) > 75 && p(DIMENSIONS.SELF_AWARENESS) < 45) {
    patterns.push({
      id: 'expressive_unaware',
      title: "Bold Expressor",
      description: "Strong outward confidence but might benefit from deeper reflection on internal motivations."
    });
  }

  if (p(DIMENSIONS.EMOTIONAL_BALANCE) > 70 && p(DIMENSIONS.DECISION_MAKING) > 70) {
    patterns.push({
      id: 'calm_strategist',
      title: "Steady Decision-Maker",
      description: "Exceptional ability to remain logical and calm under high-pressure scenarios."
    });
  }

  if (p(DIMENSIONS.DRIVE) < 40 && p(DIMENSIONS.SELF_AWARENESS) > 70) {
    patterns.push({
      id: 'aware_stalled',
      title: "Insightful Dreamer",
      description: "Knows exactly what needs to be done but struggles to translate that insight into consistent action."
    });
  }

  return patterns;
};

/**
 * Layer 6: Risk Engine
 */
const detectRisks = (scores, patterns) => {
  const risks = [];
  const p = (dim) => scores[dim].percentile;

  if (p(DIMENSIONS.EMOTIONAL_BALANCE) < 30) risks.push("High sensitivity to pressure and environmental stressors.");
  if (p(DIMENSIONS.DRIVE) > 85 && p(DIMENSIONS.EMOTIONAL_BALANCE) < 40) risks.push("Susceptibility to academic or personal burnout.");
  if (p(DIMENSIONS.DECISION_MAKING) < 30) risks.push("Tendency towards over-analysis or 'paralysis by analysis'.");
  if (p(DIMENSIONS.SELF_AWARENESS) < 30) risks.push("Risk of ignoring internal warning signs of fatigue or stress.");
  
  return risks;
};

/**
 * Layer 7: Archetype Engine
 */
const determineArchetype = (scores, patterns) => {
  const p = (dim) => scores[dim].percentile;

  if (p(DIMENSIONS.DRIVE) > 70 && p(DIMENSIONS.DECISION_MAKING) > 70) return { name: "The Grounded Leader", tagline: "Logic meets ambition.", description: "You are a pragmatic visionary who builds steady paths toward high goals." };
  if (p(DIMENSIONS.SELF_AWARENESS) > 70 && p(DIMENSIONS.EMOTIONAL_BALANCE) > 70) return { name: "The Zen Strategist", tagline: "Peace meets precision.", description: "You navigate life with a calm clarity that others find deeply reassuring." };
  if (p(DIMENSIONS.CONFIDENCE) > 70 && p(DIMENSIONS.DRIVE) > 70) return { name: "The Dynamic Catalyst", tagline: "Energy meets action.", description: "You are a natural force of change, inspiring others with your bold pursuit of goals." };
  if (p(DIMENSIONS.SELF_AWARENESS) > 70 && p(DIMENSIONS.CONFIDENCE) < 40) return { name: "The Deep Thinker", tagline: "Depth meets silence.", description: "Your internal world is rich and complex, often providing insights others miss." };
  
  return { name: "The Rising Performer", tagline: "Growth meets potential.", description: "You are in a significant phase of development, building strengths across multiple areas." };
};

/**
 * Layer 8 & 9: Narrative & Explainability Engine
 */
const generateNarrativeReport = (scores, latentTraits, patterns, risks, archetype, studentInfo) => {
  // This is a simplified narrative generator. 
  // In a full build, this would use a more complex template system.
  
  const firstName = studentInfo.name.split(' ')[0];

  const sections = {
    snapshot: `${firstName}, your behavioral profile suggests you are ${archetype.name.toLowerCase()}. You operate primarily through a lens of ${scores[DIMENSIONS.DECISION_MAKING].percentile > 50 ? 'logical analysis' : 'intuitive feeling'}.`,
    
    corePattern: patterns.length > 0 
      ? `One of your most defining patterns is being a ${patterns[0].title}. ${patterns[0].description}`
      : "You maintain a balanced behavioral profile without extreme outliers, suggesting high adaptability.",
    
    dimensionHighlights: Object.entries(scores).map(([dim, data]) => {
      let insight = "";
      if (data.percentile > 75) insight = `Your strength in ${dim} is exceptional, allowing you to handle complex situations with ease.`;
      else if (data.percentile < 35) insight = `Developing more consistency in ${dim} could unlock new levels of personal performance.`;
      else insight = `You show moderate capability in ${dim}, providing a stable foundation for your daily activities.`;
      return { dimension: dim, insight };
    }),

    socialStyle: scores[DIMENSIONS.CONFIDENCE].percentile > 60 
      ? "In social settings, you tend to take the lead, comfortably expressing your thoughts and guiding the conversation."
      : "You prefer a more observational role in groups, choosing your moments to speak with deliberation and care.",

    growthFocus: risks.length > 0
      ? `Based on your profile, focusing on ${risks[0].toLowerCase().split('.')[0]} will be your biggest lever for growth.`
      : "Since your profile is well-balanced, your next growth phase should focus on mastering leadership dynamics."
  };

  return sections;
};
