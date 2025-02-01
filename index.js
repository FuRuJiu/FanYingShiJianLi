document.addEventListener('DOMContentLoaded', function() {
    // 添加退出登录功能
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = '退出登录';
    logoutBtn.className = 'logout-btn';
    logoutBtn.onclick = function() {
        // 清除登录信息
        localStorage.removeItem('currentUser');
        window.location.reload();
    };

    // 将退出按钮添加到适当的位置
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        userInfo.appendChild(logoutBtn);
    }

    // 视图切换功能
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const resumeGrid = document.querySelector('.resume-grid');
    
    // 设置默认视图为网格
    gridViewBtn.classList.add('active');

    // 切换到网格视图
    gridViewBtn.addEventListener('click', function() {
        resumeGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        localStorage.setItem('viewPreference', 'grid');
    });

    // 切换到列表视图
    listViewBtn.addEventListener('click', function() {
        resumeGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        localStorage.setItem('viewPreference', 'list');
    });

    // 恢复视图偏好
    const savedView = localStorage.getItem('viewPreference');
    if (savedView === 'list') {
        resumeGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }

    // 应用保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || 
        (savedTheme === 'system' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
    }

    // 添加新简历和导入简历的点击事件处理
    const newResumeCard = document.querySelector('.new-resume');
    const importResumeCard = document.querySelector('.import-resume');
    const newResumeModal = document.getElementById('newResumeModal');
    const closeModalBtn = document.querySelector('.close-btn');

    // 创建新简历
    newResumeCard.addEventListener('click', function() {
        newResumeModal.style.display = 'flex';
    });

    // 导入简历
    importResumeCard.addEventListener('click', function() {
        // 创建一个隐藏的文件输入框
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json,.pdf,.docx,.doc';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // 这里添加处理导入文件的逻辑
                alert(`准备导入文件: ${file.name}`);
                // TODO: 实现文件导入功能
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    });

    // 关闭模态框
    closeModalBtn.addEventListener('click', function() {
        newResumeModal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === newResumeModal) {
            newResumeModal.style.display = 'none';
        }
    });

    // 处理新建简历表单提交
    const newResumeForm = document.getElementById('newResumeForm');
    newResumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('resumeTitle').value;
        const subtitle = document.getElementById('resumeSubtitle').value;

        // 创建新简历数据
        const newResume = {
            id: Date.now(), // 使用时间戳作为唯一ID
            title: title,
            subtitle: subtitle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content: {} // 初始化空内容
        };

        // 保存简历数据到本地存储
        const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        resumes.push(newResume);
        localStorage.setItem('resumes', JSON.stringify(resumes));

        // 关闭模态框并清空表单
        newResumeModal.style.display = 'none';
        newResumeForm.reset();

        // 跳转到编辑器页面，并传递简历ID
        window.location.href = `editor.html?id=${newResume.id}`;
    });

    // 随机生成简历标题
    const randomBtn = document.querySelector('.random-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', function() {
            const titles = [
                '软件工程师简历',
                '前端开发工程师简历',
                '全栈开发工程师简历',
                'UI设计师简历',
                '产品经理简历'
            ];
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            document.getElementById('resumeTitle').value = randomTitle;
        });
    }
}); 