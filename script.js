const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const clearChat = document.getElementById("clearChat");

// Predefined healthcare information.
// This is NOT an AI model.
const healthAnswers = [
  {
    keywords: ["hello", "hi", "hey"],
    answer: "Hello! Welcome to RuralCare. You can ask me about general wellness, hydration, hygiene, nutrition and common health topics."
  },
  {
    keywords: ["water", "hydration", "drink"],
    answer: "Drinking safe water regularly supports hydration. Water needs vary depending on age, activity, climate and health conditions."
  },
  {
    keywords: ["diet", "food", "nutrition", "eat"],
    answer: "A balanced diet includes vegetables, fruits, whole grains and suitable protein sources. Limit excessive salt, sugar and highly processed foods."
  },
  {
    keywords: ["hand", "hygiene", "wash"],
    answer: "Wash your hands with soap and clean water, especially before eating, after using the toilet and after coughing or sneezing."
  },
  {
    keywords: ["fever", "temperature"],
    answer: "Fever can have many causes. Rest, drink fluids and monitor symptoms. Seek medical advice if the fever is persistent, severe or accompanied by concerning symptoms."
  },
  {
    keywords: ["medicine", "tablet", "medication"],
    answer: "Always take medicines according to instructions from a qualified healthcare professional. Never start, stop or change a medicine dose based only on this chatbot."
  },
  {
    keywords: ["exercise", "walking", "fitness"],
    answer: "Regular physical activity supports heart health, strength and general wellbeing. Choose activities suitable for your age and health condition."
  },
  {
    keywords: ["sleep", "rest"],
    answer: "Good sleep supports physical and mental wellbeing. Maintain a regular sleep schedule and a comfortable sleeping environment."
  },
  {
    keywords: ["emergency", "chest pain", "breathing"],
    answer: "If someone has severe breathing difficulty, chest pain, unconsciousness, signs of stroke or another serious emergency, contact emergency services immediately. In India, call 112."
  },
  {
    keywords: ["doctor", "hospital", "clinic"],
    answer: "For personal medical advice, visit a qualified doctor or nearby healthcare centre. This platform does not provide medical diagnosis."
  }
];

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}-message`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAnswer(question) {
  const normalized = question.toLowerCase();

  const matched = healthAnswers.find(item =>
    item.keywords.some(keyword => normalized.includes(keyword))
  );

  if (matched) return matched.answer;

  return "I don't have a predefined answer for that question. Please contact a qualified healthcare professional for reliable medical advice. You can ask me about nutrition, hydration, hygiene, exercise or general wellness.";
}

function sendMessage(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  chatInput.value = "";

  const answer = getAnswer(cleanQuestion);

  setTimeout(() => {
    addMessage(answer, "bot");
  }, 350);
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(chatInput.value);
});

document.querySelectorAll(".quick-btn").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.textContent);
  });
});

clearChat.addEventListener("click", () => {
  chatMessages.innerHTML = "";
  addMessage("Hello! Welcome to RuralCare. 👋 Ask a general healthcare question.", "bot");
});

// Mobile navigation
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    sidebar.classList.remove("open");
  });
});

// Appointment form demonstration
const appointmentForm = document.getElementById("appointmentForm");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentMessage = document.getElementById("appointmentMessage");

// Do not allow selecting past dates
const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

appointmentDate.min = localToday;

appointmentForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();
  const date = appointmentDate.value;
  const department = document.getElementById("department").value;

  if (!name || !phone || !date || !department) {
    appointmentMessage.textContent = "Please complete all fields.";
    return;
  }

  if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
    appointmentMessage.textContent = "Please enter a valid phone number.";
    return;
  }

  appointmentMessage.textContent =
    "Demo request prepared successfully. This information has NOT been sent to a hospital. Please contact your healthcare provider directly.";

  appointmentForm.reset();
  appointmentDate.min = localToday;
});