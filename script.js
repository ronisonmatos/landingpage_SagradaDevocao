// Configurações da API
const API_URL = 'https://api-logs.devalltech.com.br/api/v1/events';
const API_TOKEN = '0b03293de05d2c630c9428bfe13e08393a10db73f10717226b0b3247dbf4913e';

// Elementos DOM
const logsContainer = document.getElementById('logsContainer');
const loadLogsBtn = document.getElementById('loadLogs');
const clearLogsBtn = document.getElementById('clearLogs');

// Função para carregar logs da API
async function loadLogs() {
    try {
        // Mostrar mensagem de carregamento
        logsContainer.innerHTML = '<div class="loading-message">Carregando atividades...</div>';
        
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }
        
        const logs = await response.json();
        
        // Limpar container
        logsContainer.innerHTML = '';
        
        if (logs.length === 0) {
            logsContainer.innerHTML = '<div class="loading-message">Nenhuma atividade recente encontrada</div>';
            return;
        }
        
        // Exibir logs
        logs.forEach(log => {
            const logElement = document.createElement('div');
            logElement.className = 'log-item';
            
            // Determinar classe com base no tipo de log
            let typeClass = 'log-info';
            if (log.type && log.type.toLowerCase().includes('error')) {
                typeClass = 'log-error';
            } else if (log.type && log.type.toLowerCase().includes('warning')) {
                typeClass = 'log-warning';
            }
            
            // Formatar a data se disponível
            let timestamp = log.timestamp || 'Data não disponível';
            if (log.timestamp) {
                timestamp = new Date(log.timestamp).toLocaleString('pt-BR');
            }
            
            logElement.innerHTML = `
                <div>
                    <span class="log-type ${typeClass}">${log.type || 'INFO'}</span>
                    <strong>${timestamp}</strong>
                </div>
                <p>${log.description || 'Descrição não disponível'}</p>
            `;
            
            logsContainer.appendChild(logElement);
        });
    } catch (error) {
        logsContainer.innerHTML = `
            <div class="error-message">
                Falha ao carregar atividades: ${error.message}
            </div>
        `;
        console.error('Erro ao carregar logs:', error);
    }
}

// Função para limpar logs exibidos
function clearLogs() {
    logsContainer.innerHTML = '<div class="loading-message">Clique em "Carregar Atividades" para ver os eventos recentes</div>';
}

// Adicionar event listeners para os botões de log
if (loadLogsBtn && clearLogsBtn) {
    loadLogsBtn.addEventListener('click', loadLogs);
    clearLogsBtn.addEventListener('click', clearLogs);
}

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        item.classList.toggle("active");
    });
});