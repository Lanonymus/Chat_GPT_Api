const chatWindow = document.getElementById('chat-window');
const inputMessage = document.getElementById('input-message');
const sendButton = document.getElementById('send-button');
const roleSelect = document.getElementById('role');
const ownRoleInput = document.getElementById('own_role');
const confirmButton = document.getElementById('confirm');

const API_KEY = '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';

async function getResponse(userInput, selectedRole) {
  try {
    let role;
    if (selectedRole === "Podaj Własną") {
      role = ownRoleInput.value;
    } else {
      role = selectedRole;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'assistant', content: `Od teraz zachowuj się jak ${role} .` },
          { role: 'user', content: userInput }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    const textContent = data.choices[0].message.content;

    const userMessage = document.createElement('div');
    userMessage.innerHTML = `<b>You:</b> ${userInput}`;
    const botMessage = document.createElement('div');
    botMessage.innerHTML = `<b>Chat GPT:</b> ${textContent}`;

    userMessage.style.padding = '8px';
    userMessage.style.height = '20px';
    botMessage.style.padding = '8px';

    chatWindow.appendChild(userMessage);
    chatWindow.appendChild(botMessage);

  } catch (error) {
    console.error('Błąd:', error);
  }
}

sendButton.addEventListener('click', () => {
  const message = inputMessage.value;
  const selectedRole = roleSelect.value;
  if (message !== '') {
    getResponse(message, selectedRole);
    inputMessage.value = '';
  }
});

inputMessage.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

confirmButton.addEventListener('click', () => {
  console.log(ownRoleInput.value);
  const selectedRole = roleSelect.value;
  if (selectedRole === "Podaj Własną") {
    const customRole = ownRoleInput.value;
    getResponse(`Od teraz zachowuj się jak ${customRole}.`, customRole);
  }
});



function handleRoleChange() {
  const roleSelect = document.getElementById('role');
  const selectedValue = roleSelect.value;
  if (selectedValue === "Podaj Własną") {
    showInput();
    console.log(selectedValue);
  } else {
    hideInput();
    console.log(selectedValue);
  }
}

function showInput() {
  var x = document.querySelector(".input_role");
  var y = document.getElementById('confirm')
  x.style.display = "block";
  y.style.display = "block";
}

function hideInput() {
  var x = document.querySelector(".input_role");
  var y = document.getElementById('confirm')
  x.style.display = "none";
  y.style.display = "none";
}

