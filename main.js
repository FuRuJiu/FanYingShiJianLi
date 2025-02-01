document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const newResumeCard = document.querySelector('.new-resume');
    const importResumeCard = document.querySelector('.import-resume');
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const resumeGrid = document.querySelector('.resume-grid');
    
    // 弹窗相关元素
    const modal = document.getElementById('newResumeModal');
    const closeBtn = modal.querySelector('.close-btn');
    const newResumeForm = document.getElementById('newResumeForm');

    // 打开创建新简历弹窗
    newResumeCard.addEventListener('click', function() {
        modal.classList.add('show');
    });

    // 关闭弹窗的多个方式
    function closeModal() {
        modal.classList.remove('show');
        newResumeForm.reset(); // 重置表单
    }

    closeBtn.addEventListener('click', closeModal);
    
    // 点击弹窗外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 表单提交处理
    newResumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('resumeTitle').value;
        const subtitle = document.getElementById('resumeSubtitle').value;
        
        // 创建新的简历卡片
        const resumeCard = createResumeCard(title, subtitle);
        
        // 将新卡片插入到"创建新简历"卡片后面
        newResumeCard.parentNode.insertBefore(resumeCard, newResumeCard.nextSibling);
        
        // 关闭弹窗
        closeModal();
    });

    // 导入简历
    importResumeCard.addEventListener('click', function() {
        // TODO: 实现导入简历的逻辑
        console.log('导入简历');
    });

    // 视图切换功能
    // 设置默认视图为网格
    gridViewBtn.classList.add('active');

    // 切换到网格视图
    gridViewBtn.addEventListener('click', function() {
        resumeGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        
        // 保存用户偏好
        localStorage.setItem('viewPreference', 'grid');
    });

    // 切换到列表视图
    listViewBtn.addEventListener('click', function() {
        resumeGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        
        // 保存用户偏好
        localStorage.setItem('viewPreference', 'list');
    });

    // 恢复用户的视图偏好
    const savedView = localStorage.getItem('viewPreference');
    if (savedView === 'list') {
        resumeGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }

    // 创建简历卡片的函数
    function createResumeCard(title, subtitle) {
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        const card = document.createElement('div');
        card.className = 'resume-item';
        
        card.innerHTML = `
            <div class="resume-item-header">
                <div>
                    <div class="resume-item-title">${title}</div>
                    <div class="resume-item-subtitle">${subtitle}</div>
                </div>
                <div class="resume-item-date">${dateStr}</div>
            </div>
            <div class="resume-item-hint">双击打开以编辑简历</div>
            <div class="resume-item-footer">
                <div class="resume-item-status">最后更新 几秒前</div>
                <div class="resume-item-actions">
                    <button class="resume-item-action" title="重命名">✎</button>
                    <button class="resume-item-action" title="下载简历">↓</button>
                    <button class="resume-item-action" title="删除简历">×</button>
                </div>
            </div>
        `;

        // 添加事件监听器
        const actions = card.querySelectorAll('.resume-item-action');
        actions.forEach(action => {
            action.addEventListener('click', (e) => {
                e.stopPropagation();
                const actionType = action.getAttribute('title');
                switch(actionType) {
                    case '重命名':
                        const newTitle = prompt('请输入新的简历标题:', title);
                        if (newTitle && newTitle.trim() !== '') {
                            card.querySelector('.resume-item-title').textContent = newTitle.trim();
                        }
                        break;
                    case '下载简历':
                        console.log('下载简历:', title);
                        alert('开始下载简历...');
                        break;
                    case '删除简历':
                        if(confirm('确定要删除这份简历吗？')) {
                            card.remove();
                        }
                        break;
                }
            });
        });

        // 修改点击事件为双击事件
        card.addEventListener('dblclick', () => {
            window.location.href = `editor.html?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;
        });

        return card;
    }
}); 