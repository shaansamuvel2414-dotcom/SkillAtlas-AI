export const quickActions = [
  { id: 'explain', label: 'Explain Simply', icon: '💡' },
  { id: 'example', label: 'Give Example', icon: '📝' },
  { id: 'video', label: 'Recommend Video', icon: '▶️' },
  { id: 'docs', label: 'Open Documentation', icon: '📖' },
  { id: 'practice', label: 'Give Practice', icon: '💪' },
  { id: 'next', label: 'What to Learn Next?', icon: '🗺️' },
];

const responses = {
  explain: `Arrays endraal oru fixed-size-la same type elements store panna oru data structure. Simple-ah solli, oru row of boxes mathiri — har box-la oru value irukum. Index 0-la start agum!

\`\`\`java
// Simple Array Declaration
int[] marks = {85, 90, 78, 92, 88};

// Access by index
System.out.println(marks[0]); // 85
System.out.println(marks[3]); // 92
\`\`\`

Key Points:
• Index 0 la start agum (zero-based)
• Length fixed agum once declared
• Same data type mattume store panlaam`,

  example: `\`\`\`java
// Array Input using for loop
import java.util.Scanner;

public class ArrayExample {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = 5;
    int[] arr = new int[n];
    
    // Input
    System.out.println("Enter 5 numbers:");
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
    }
    
    // Find largest
    int max = arr[0];
    for (int i = 1; i < n; i++) {
      if (arr[i] > max) max = arr[i];
    }
    
    System.out.println("Largest: " + max);
  }
}
\`\`\`
Idhu practical example: 5 numbers input eduthu largest-a find panrom!`,

  video: `🎥 **Best Tamil Videos for Java Arrays:**

📺 **"Java Arrays - முழு Tutorial"** by Tamil Coding Tutorials
⏱ 24 min | Beginner | Relevance: 98%

📺 **"Arrays in Java Tamil"** by Code with Arjun
⏱ 18 min | Beginner | Relevance: 95%

📺 **"Java Arrays in 10 Minutes"** by Quick Learn Tamil
⏱ 10 min | Beginner | Relevance: 96%

➡️ Videos tab-la click pannaa full list kaanalam!`,

  docs: `📖 **Official Documentation:**
Oracle Java Docs — Arrays chapter (full API reference)

📚 **Recommended Websites:**
• GeeksforGeeks — Java Arrays Tutorial (Beginner-friendly)
• W3Schools — Java Arrays (Try-it-yourself)
• Javatpoint — Array Complete Guide (Diagrams)
• Baeldung — Advanced Array Operations

➡️ Websites tab-la poyaa full resource list kaanalam!`,

  practice: `💪 **Practice Problems for Java Arrays:**

🟢 Easy: Find Largest Element (10 min)
🟢 Easy: Reverse an Array (15 min)
🟢 Easy: Two Sum (15 min)
🟡 Medium: Remove Duplicates (20 min)
🟡 Medium: Rotate an Array (25 min)
🔴 Hard: Matrix Multiplication (40 min)

➡️ Practice tab-la click pannaa start panlaam!`,

  next: `📍 **Your Current Progress:** Arrays (65%)

**Recommended Next Steps:**
1. ✅ Complete Array Traversal concepts
2. 💪 Practice: Find Largest + Reverse Array
3. 📚 Then move to → **Strings**

**After Strings:**
→ OOP Concepts → Collections → Mini Project

➡️ Roadmap tab-la full learning path kaanalam! 🗺️`,

  default: `Vanakkam! Naan SkillAtlas AI — ungalukkு learn panna help pannuven! 🎓

Java Arrays pathi ennavenalum kelunga. Neenga type pannalaam illa quick actions use pannalaam:

• Tamil-la explain pannuven
• Code examples kaattuven  
• Best videos recommend pannuven
• Practice problems suggest pannuven

Type naturally. Learn comfortably. 😊`,
};

export const getAIResponse = (input, action = null) => {
  if (action && responses[action]) return responses[action];

  const lower = input.toLowerCase();
  if (lower.includes('explain') || lower.includes('simple') || lower.includes('puriyala') || lower.includes('enna'))
    return responses.explain;
  if (lower.includes('example') || lower.includes('code') || lower.includes('epdi') || lower.includes('how'))
    return responses.example;
  if (lower.includes('video') || lower.includes('paakanum') || lower.includes('watch'))
    return responses.video;
  if (lower.includes('doc') || lower.includes('website') || lower.includes('read'))
    return responses.docs;
  if (lower.includes('practice') || lower.includes('venum') || lower.includes('problem') || lower.includes('solve'))
    return responses.practice;
  if (lower.includes('next') || lower.includes('learn') || lower.includes('roadmap') || lower.includes('eppadi'))
    return responses.next;
  if (lower.includes('array'))
    return responses.explain;
  return responses.default;
};
