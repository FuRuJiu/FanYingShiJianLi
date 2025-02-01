document.addEventListener('DOMContentLoaded', function() {
    // 头像上传
    const avatarInput = document.getElementById('avatarInput');
    const currentAvatar = document.querySelector('.current-avatar');

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentAvatar.innerHTML = `<img src="${e.target.result}" alt="用户头像" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // 保存密码
    const savePasswordBtn = document.querySelector('.save-btn');
    savePasswordBtn.addEventListener('click', function() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;

        if (!currentPassword || !newPassword) {
            alert('请填写完整的密码信息');
            return;
        }

        // 这里添加密码更新逻辑
        alert('密码更新成功！');
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
    });

    // 启用双重认证
    const enable2FABtn = document.querySelector('.enable-2fa-btn');
    enable2FABtn.addEventListener('click', function() {
        alert('即将开启双重认证设置...');
        // 这里添加双重认证设置逻辑
    });

    // 自动保存用户信息
    const displayNameInput = document.getElementById('displayName');
    const usernameInput = document.getElementById('username');

    [displayNameInput, usernameInput].forEach(input => {
        let timer;
        input.addEventListener('input', function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                // 这里添加保存用户信息的逻辑
                console.log('保存用户信息:', input.id, input.value);
            }, 500);
        });
    });

    // 主题设置
    const themeSelect = document.getElementById('theme');

    // 初始化主题
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'system';
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    }

    // 应用主题
    function applyTheme(theme) {
        if (theme === 'system') {
            // 检测系统主题
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('dark-theme', prefersDark);
            
            // 监听系统主题变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                document.body.classList.toggle('dark-theme', e.matches);
            });
        } else {
            document.body.classList.toggle('dark-theme', theme === 'dark');
            // 移除系统主题监听
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
        }
    }

    // 监听主题变化
    themeSelect.addEventListener('change', function() {
        const selectedTheme = this.value;
        localStorage.setItem('theme', selectedTheme);
        applyTheme(selectedTheme);
    });

    // 初始化主题
    initTheme();

    // 语言设置
    const languageSelect = document.getElementById('language');
    languageSelect.value = localStorage.getItem('language') || 'zh-CN';
    languageSelect.addEventListener('change', function() {
        localStorage.setItem('language', this.value);
    });

    // Deepseek 设置
    const apiKeyInput = document.getElementById('apiKey');
    const baseUrlInput = document.getElementById('baseUrl');
    const modelInput = document.getElementById('model');
    const maxTokensInput = document.getElementById('maxTokens');
    const saveApiBtn = document.querySelector('.save-btn');

    // 加载保存的设置
    apiKeyInput.value = localStorage.getItem('deepseek_api_key') || '';
    baseUrlInput.value = localStorage.getItem('deepseek_base_url') || 'http://localhost:11434/v1';
    modelInput.value = localStorage.getItem('deepseek_model') || 'deepseek-chat';
    maxTokensInput.value = localStorage.getItem('deepseek_max_tokens') || '1024';

    // 保存 API 设置
    saveApiBtn.addEventListener('click', function() {
        localStorage.setItem('deepseek_api_key', apiKeyInput.value);
        localStorage.setItem('deepseek_base_url', baseUrlInput.value);
        localStorage.setItem('deepseek_model', modelInput.value);
        localStorage.setItem('deepseek_max_tokens', maxTokensInput.value);
        
        alert('设置已保存到本地！');
    });

    // 删除账户功能
    const deleteConfirmInput = document.getElementById('deleteConfirm');
    const deleteBtn = document.querySelector('.delete-btn');

    deleteConfirmInput.addEventListener('input', function() {
        deleteBtn.disabled = this.value.toLowerCase() !== 'delete';
    });

    deleteBtn.addEventListener('click', function() {
        if (deleteConfirmInput.value.toLowerCase() === 'delete') {
            if (confirm('确定要删除所有数据吗？此操作不可逆！')) {
                localStorage.clear();
                window.location.reload();
            }
        }
    });
}); 