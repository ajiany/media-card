let selectedText = '';
let generateButton;
let cardOverlay;

// 创建并添加样式
const style = document.createElement('style');
style.textContent = `
  .generate-button {
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    color: #333333;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 20px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  .generate-button:hover {
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  .generate-button::before {
    content: "✨";
    margin-right: 6px;
    font-size: 16px;
  }
  .card-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }
  .card {
    width: 1080px;
    height: 1080px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .card-content {
    max-width: 80%;
    text-align: center;
  }
  .quote {
    font-family: 'Georgia', serif;
    font-size: 48px;
    color: #333333;
    line-height: 1.4;
    margin-bottom: 40px;
    position: relative;
  }
  .quote::before,
  .quote::after {
    content: '"';
    font-size: 80px;
    color: #e0e0e0;
    position: absolute;
  }
  .quote::before {
    top: -40px;
    left: -20px;
  }
  .quote::after {
    bottom: -60px;
    right: -20px;
  }
  .author {
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    color: #666666;
    font-style: italic;
  }
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: #333333;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }
`;
document.head.appendChild(style);

document.addEventListener('mouseup', function(e) {
  selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    showGenerateButton(e);
  } else {
    hideGenerateButton();
  }
});

function showGenerateButton(e) {
  if (!generateButton) {
    generateButton = document.createElement('button');
    generateButton.textContent = 'Generate';
    generateButton.className = 'generate-button';
    generateButton.addEventListener('click', function() {
      generateCard(selectedText);
    });
    document.body.appendChild(generateButton);
  }
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  generateButton.style.left = `${window.pageXOffset + rect.left + (rect.width / 2) - (generateButton.offsetWidth / 2)}px`;
  generateButton.style.top = `${window.pageYOffset + rect.bottom + 10}px`;
  generateButton.style.display = 'flex';
}

function hideGenerateButton() {
  if (generateButton) {
    generateButton.style.display = 'none';
  }
}

function generateCard(text) {
  cardOverlay = document.createElement('div');
  cardOverlay.className = 'card-overlay';
  cardOverlay.innerHTML = `
    <div class="card">
      <div class="card-content">
        <div class="quote">${text}</div>
      </div>
      <button class="close-button" onclick="closeCard()">×</button>
    </div>
  `;
  document.body.appendChild(cardOverlay);

  // 添加 ESC 键监听器
  document.addEventListener('keydown', handleEscKey);
}

function closeCard() {
  if (cardOverlay) {
    cardOverlay.remove();
    cardOverlay = null;
    // 移除 ESC 键监听器
    document.removeEventListener('keydown', handleEscKey);
  }
}
function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeCard();
  }
}

// 将 closeCard 函数添加到全局作用域
window.closeCard = closeCard;
