document.addEventListener('DOMContentLoaded', function() {
    // 声明全局变量
    let isPortraitVisible = true;

    // 获取所有输入字段
    const inputFields = document.querySelectorAll('.editor-input, .modal-input');
    const richTextEditor = document.querySelector('.editor-content-area');

    // 监听所有输入框的变化
    inputFields.forEach(input => {
        input.addEventListener('input', generatePreview);
    });

    // 监听富文本编辑器的变化
    if (richTextEditor) {
        richTextEditor.addEventListener('input', generatePreview);
    }

    // 获取预览区域元素
    const previewArea = document.querySelector('.resume-preview');

    // 修改预览功能
    function generatePreview() {
        const formData = {
            name: document.querySelector('.editor-input[value="西小与子"]')?.value || '',
            title: document.querySelector('.editor-input[placeholder="请输入您的职位"]')?.value || '',
            email: document.querySelector('.editor-input[placeholder="请输入您的邮箱"]')?.value || '',
            phone: document.querySelector('.editor-input[placeholder="请输入您的电话"]')?.value || '',
            website: document.querySelector('.editor-input[placeholder="请输入您的网站"]')?.value || '',
            location: document.querySelector('.editor-input[placeholder="请输入您的位置"]')?.value || '',
            summary: document.querySelector('.editor-content-area')?.innerHTML || '',
            // 获取所有个人简介条目
            profiles: Array.from(document.querySelectorAll('.profile-item')).map(item => ({
                network: item.querySelector('.profile-title').textContent,
                username: item.querySelector('.profile-subtitle').textContent,
            })),
            // 添加工作经验数据
            experiences: Array.from(document.querySelectorAll('.experience-item')).map(item => ({
                company: item.querySelector('.experience-company').textContent,
                position: item.querySelector('.experience-position').textContent,
                date: item.querySelector('.experience-date').textContent,
                location: item.querySelector('.experience-location').textContent,
                website: item.querySelector('.experience-website').textContent,
                summary: item.querySelector('.experience-summary').innerHTML
            })),
            // 添加教育经历数据
            educations: Array.from(document.querySelectorAll('.education-item')).map(item => ({
                school: item.querySelector('.education-school').textContent,
                degree: item.querySelector('.education-degree').textContent,
                field: item.querySelector('.education-field').textContent,
                score: item.querySelector('.education-score').textContent,
                date: item.querySelector('.education-date').textContent,
                website: item.querySelector('.education-website').textContent,
                summary: item.querySelector('.education-summary').innerHTML
            })),
            // 添加专业技能数据
            skills: Array.from(document.querySelectorAll('.skill-item')).map(item => ({
                name: item.querySelector('.skill-name').textContent,
                description: item.querySelector('.skill-description').textContent,
                level: item.querySelector('.skill-level').textContent,
                keywords: item.querySelector('.skill-keywords').textContent
            })),
            // 添加语言情况数据
            languages: Array.from(document.querySelectorAll('.language-item')).map(item => ({
                name: item.querySelector('.language-name').textContent,
                description: item.querySelector('.language-description').textContent,
                level: item.querySelector('.language-level').textContent
            })),
            // 添加奖品奖项数据
            awards: Array.from(document.querySelectorAll('.award-item')).map(item => ({
                title: item.querySelector('.award-title').textContent,
                issuer: item.querySelector('.award-issuer').textContent,
                date: item.querySelector('.award-date').textContent,
                website: item.querySelector('.award-website').textContent,
                summary: item.querySelector('.award-summary').innerHTML
            })),
            // 添加专业证书数据
            certifications: Array.from(document.querySelectorAll('.certification-item')).map(item => ({
                name: item.querySelector('.certification-name').textContent,
                issuer: item.querySelector('.certification-issuer').textContent,
                date: item.querySelector('.certification-date').textContent,
                website: item.querySelector('.certification-website').textContent,
                summary: item.querySelector('.certification-summary').innerHTML
            })),
            // 添加兴趣爱好数据
            interests: Array.from(document.querySelectorAll('.interest-item')).map(item => ({
                name: item.querySelector('.interest-name').textContent,
                keywords: item.querySelector('.interest-keywords').textContent
            })),
            // 添加项目经验数据
            projects: Array.from(document.querySelectorAll('.project-item')).map(item => ({
                name: item.querySelector('.project-name').textContent,
                description: item.querySelector('.project-description').textContent,
                date: item.querySelector('.project-date').textContent,
                website: item.querySelector('.project-website').textContent,
                summary: item.querySelector('.project-summary').innerHTML,
                keywords: item.querySelector('.project-keywords').textContent
            })),
            // 添加发表作品数据
            publications: Array.from(document.querySelectorAll('.publication-item')).map(item => ({
                name: item.querySelector('.publication-name').textContent,
                publisher: item.querySelector('.publication-publisher').textContent,
                date: item.querySelector('.publication-date').textContent,
                website: item.querySelector('.publication-website').textContent,
                summary: item.querySelector('.publication-summary').innerHTML
            })),
            // 添加志愿经历数据
            volunteers: Array.from(document.querySelectorAll('.volunteer-item')).map(item => ({
                organization: item.querySelector('.volunteer-name').textContent,
                position: item.querySelector('.volunteer-position').textContent,
                date: item.querySelector('.volunteer-date').textContent,
                location: item.querySelector('.volunteer-location').textContent,
                website: item.querySelector('.volunteer-website').textContent,
                summary: item.querySelector('.volunteer-summary').innerHTML
            })),
            // 添加推荐人/信数据
            references: Array.from(document.querySelectorAll('.reference-item')).map(item => ({
                name: item.querySelector('.reference-name').textContent,
                description: item.querySelector('.reference-description').textContent,
                website: item.querySelector('.reference-website').textContent,
                summary: item.querySelector('.reference-summary').innerHTML
            })),
            // 添加自定义章节数据
            customSections: Array.from(document.querySelectorAll('.editor-section')).filter(section => 
                section.querySelector('.section-icon[data-icon="📄"]')
            ).map(section => ({
                title: section.querySelector('.section-header span:not(.section-icon)').textContent,
                items: Array.from(section.querySelectorAll('.custom-item')).map(item => ({
                    name: item.querySelector('.custom-name')?.textContent || '',
                    description: item.querySelector('.custom-description')?.textContent || '',
                    date: item.querySelector('.custom-date')?.textContent || '',
                    location: item.querySelector('.custom-location')?.textContent || '',
                    website: item.querySelector('.custom-website')?.textContent || '',
                    summary: item.querySelector('.custom-summary')?.innerHTML || '',
                    keywords: item.querySelector('.custom-keywords')?.textContent || ''
                })),
                isVisible: section.querySelector('.toggle-custom-visibility .visibility-text')?.textContent === '隐藏内容'
            })),
            // 添加肖像照片数据收集
            portraits: Array.from(document.querySelectorAll('.portrait-item')).map(item => ({
                image: item.querySelector('.portrait-image').src
            })),
            isPortraitVisible: isPortraitVisible
        };

        // 生成预览 HTML
        const previewHTML = `
            <div class="preview-resume">
                <header class="preview-header">
                    <h1 class="preview-name">${formData.name || '您的姓名'}</h1>
                    <p class="preview-title">${formData.title || '职位名称'}</p>
                </header>
                
                <div class="preview-contact">
                    ${formData.email ? `<p><span class="contact-icon">📧</span> ${formData.email}</p>` : ''}
                    ${formData.website ? `<p><span class="contact-icon">🌐</span> ${formData.website}</p>` : ''}
                    ${formData.phone ? `<p><span class="contact-icon">📞</span> ${formData.phone}</p>` : ''}
                    ${formData.location ? `<p><span class="contact-icon">📍</span> ${formData.location}</p>` : ''}
                </div>

                ${formData.portraits.length > 0 && formData.isPortraitVisible ? `
                <div class="preview-portraits">
                    <h2>肖像照片</h2>
                    <div class="portraits-list">
                        ${formData.portraits.map(portrait => `
                            <div class="portrait-preview-item">
                                <img src="${portrait.image}" alt="肖像照片" class="preview-portrait-image">
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.summary ? `
                <div class="preview-summary">
                    <h2>总览</h2>
                    <div class="summary-content">${formData.summary}</div>
                </div>
                ` : ''}

                ${formData.profiles.length > 0 ? `
                <div class="preview-profiles">
                    <h2>个人简介</h2>
                    <div class="profiles-list">
                        ${formData.profiles.map(profile => `
                            <div class="profile-preview-item">
                                <span class="profile-network">${profile.network}</span>
                                <span class="profile-username">${profile.username}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.experiences.length > 0 ? `
                <div class="preview-experiences">
                    <h2>工作经验</h2>
                    <div class="experiences-list">
                        ${formData.experiences.map(exp => `
                            <div class="experience-preview-item">
                                <div class="experience-header">
                                    <h3 class="experience-title">${exp.position} @ ${exp.company}</h3>
                                    <div class="experience-meta">
                                        <span>${exp.date}</span>
                                        <span>·</span>
                                        <span>${exp.location}</span>
                                    </div>
                                </div>
                                ${exp.website ? `<a href="${exp.website}" class="experience-website" target="_blank">${exp.website}</a>` : ''}
                                <div class="experience-content">${exp.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.educations.length > 0 ? `
                <div class="preview-educations">
                    <h2>教育经历</h2>
                    <div class="educations-list">
                        ${formData.educations.map(edu => `
                            <div class="education-preview-item">
                                <div class="education-header">
                                    <h3 class="education-title">${edu.degree} @ ${edu.school}</h3>
                                    <div class="education-meta">
                                        <span>${edu.field}</span>
                                        ${edu.score ? `<span>·</span><span>${edu.score}</span>` : ''}
                                        <span>·</span>
                                        <span>${edu.date}</span>
                                    </div>
                                </div>
                                ${edu.website ? `<a href="${edu.website}" class="education-website" target="_blank">${edu.website}</a>` : ''}
                                <div class="education-content">${edu.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.skills.length > 0 ? `
                <div class="preview-skills">
                    <h2>专业技能</h2>
                    <div class="skills-list">
                        ${formData.skills.map(skill => `
                            <div class="skill-preview-item">
                                <div class="skill-header">
                                    <h3 class="skill-title">${skill.name}</h3>
                                    <div class="skill-progress">
                                        <div class="progress-bar" style="width: ${skill.level * 10}%"></div>
                                    </div>
                                </div>
                                <div class="skill-meta">
                                    <p class="skill-description">${skill.description}</p>
                                    ${skill.keywords ? `
                                    <div class="skill-tags">
                                        ${skill.keywords.split(/[,，]/).map(tag => `
                                            <span class="skill-tag">${tag.trim()}</span>
                                        `).join('')}
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.languages.length > 0 ? `
                <div class="preview-languages">
                    <h2>语言情况</h2>
                    <div class="languages-list">
                        ${formData.languages.map(lang => `
                            <div class="language-preview-item">
                                <div class="language-header">
                                    <h3 class="language-title">${lang.name}</h3>
                                    <div class="language-progress">
                                        <div class="progress-bar" style="width: ${lang.level * 10}%"></div>
                                    </div>
                                </div>
                                <div class="language-meta">
                                    <p class="language-description">${lang.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.awards.length > 0 ? `
                <div class="preview-awards">
                    <h2>奖品奖项</h2>
                    <div class="awards-list">
                        ${formData.awards.map(award => `
                            <div class="award-preview-item">
                                <div class="award-header">
                                    <h3 class="award-title">${award.title}</h3>
                                    <div class="award-meta">
                                        <span>${award.issuer}</span>
                                        <span>·</span>
                                        <span>${award.date}</span>
                                    </div>
                                </div>
                                ${award.website ? `<a href="${award.website}" class="award-website" target="_blank">${award.website}</a>` : ''}
                                <div class="award-content">${award.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.certifications.length > 0 ? `
                <div class="preview-certifications">
                    <h2>专业证书</h2>
                    <div class="certifications-list">
                        ${formData.certifications.map(cert => `
                            <div class="certification-preview-item">
                                <div class="certification-header">
                                    <h3 class="certification-title">${cert.name}</h3>
                                    <div class="certification-meta">
                                        <span>${cert.issuer}</span>
                                        <span>·</span>
                                        <span>${cert.date}</span>
                                    </div>
                                </div>
                                ${cert.website ? `<a href="${cert.website}" class="certification-website" target="_blank">${cert.website}</a>` : ''}
                                <div class="certification-content">${cert.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.interests.length > 0 ? `
                <div class="preview-interests">
                    <h2>兴趣爱好</h2>
                    <div class="interests-list">
                        ${formData.interests.map(interest => `
                            <div class="interest-preview-item">
                                <h3 class="interest-title">${interest.name}</h3>
                                ${interest.keywords ? `
                                <div class="interest-tags">
                                    ${interest.keywords.split(/[,，]/).map(tag => `
                                        <span class="interest-tag">${tag.trim()}</span>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.projects.length > 0 ? `
                <div class="preview-projects">
                    <h2>项目经验</h2>
                    <div class="projects-list">
                        ${formData.projects.map(project => `
                            <div class="project-preview-item">
                                <div class="project-header">
                                    <h3 class="project-title">${project.name}</h3>
                                    <div class="project-meta">
                                        <span>${project.description}</span>
                                        <span>·</span>
                                        <span>${project.date}</span>
                                    </div>
                                </div>
                                ${project.website ? `<a href="${project.website}" class="project-website" target="_blank">${project.website}</a>` : ''}
                                <div class="project-content">${project.summary}</div>
                                ${project.keywords ? `
                                <div class="project-tags">
                                    ${project.keywords.split(/[,，]/).map(tag => `
                                        <span class="project-tag">${tag.trim()}</span>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.publications.length > 0 ? `
                <div class="preview-publications">
                    <h2>发表作品</h2>
                    <div class="publications-list">
                        ${formData.publications.map(publication => `
                            <div class="publication-preview-item">
                                <div class="publication-header">
                                    <h3 class="publication-title">${publication.name}</h3>
                                    <div class="publication-meta">
                                        <span>${publication.publisher}</span>
                                        <span>·</span>
                                        <span>${publication.date}</span>
                                    </div>
                                </div>
                                ${publication.website ? `<a href="${publication.website}" class="publication-website" target="_blank">${publication.website}</a>` : ''}
                                <div class="publication-content">${publication.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.volunteers.length > 0 ? `
                <div class="preview-volunteers">
                    <h2>志愿经历</h2>
                    <div class="volunteers-list">
                        ${formData.volunteers.map(volunteer => `
                            <div class="volunteer-preview-item">
                                <div class="volunteer-header">
                                    <h3 class="volunteer-title">${volunteer.organization}</h3>
                                    <div class="volunteer-meta">
                                        <span>${volunteer.position}</span>
                                        <span>·</span>
                                        <span>${volunteer.date}</span>
                                        <span>·</span>
                                        <span>${volunteer.location}</span>
                                    </div>
                                </div>
                                ${volunteer.website ? `<a href="${volunteer.website}" class="volunteer-website" target="_blank">${volunteer.website}</a>` : ''}
                                <div class="volunteer-content">${volunteer.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.references.length > 0 ? `
                <div class="preview-references">
                    <h2>推荐人/信</h2>
                    <div class="references-list">
                        ${formData.references.map(reference => `
                            <div class="reference-preview-item">
                                <div class="reference-header">
                                    <h3 class="reference-title">${reference.name}</h3>
                                    <div class="reference-meta">
                                        <span>${reference.description}</span>
                                    </div>
                                </div>
                                ${reference.website ? `<a href="${reference.website}" class="reference-website" target="_blank">${reference.website}</a>` : ''}
                                <div class="reference-content">${reference.summary}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${formData.customSections.map(section => `
                <div class="preview-custom-section" style="display: ${section.isVisible ? 'block' : 'none'}">
                    <h2>${section.title}</h2>
                    <div class="custom-items-list">
                        ${section.items.map(item => `
                            <div class="custom-preview-item">
                                <div class="custom-header">
                                    <h3 class="custom-title">${item.name}</h3>
                                    <div class="custom-meta">
                                        ${item.description ? `<span>${item.description}</span>` : ''}
                                        ${item.date ? `<span>·</span><span>${item.date}</span>` : ''}
                                        ${item.location ? `<span>·</span><span>${item.location}</span>` : ''}
                                    </div>
                                </div>
                                ${item.website ? `<a href="${item.website}" class="custom-website" target="_blank">${item.website}</a>` : ''}
                                <div class="custom-content">${item.summary}</div>
                                ${item.keywords ? `
                                <div class="custom-tags">
                                    ${item.keywords.split(/[,，]/).map(tag => `
                                        <span class="custom-tag">${tag.trim()}</span>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                `).join('')}
            </div>
        `;

        previewArea.innerHTML = previewHTML;
    }

    // 初始化预览
    generatePreview();

    // 全局菜单处理
    document.addEventListener('click', function(e) {
        // 如果点击的不是菜单触发器或菜单本身
        if (!e.target.closest('.menu-trigger') && !e.target.closest('.menu-dropdown')) {
            // 关闭所有打开的菜单
            document.querySelectorAll('.menu-dropdown.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // 为所有菜单触发器添加点击事件
    document.querySelectorAll('.menu-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // 关闭其他打开的菜单
            document.querySelectorAll('.menu-dropdown.show').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });
            
            // 切换当前菜单
            dropdown.classList.toggle('show');
        });
    });

    // 防止点击菜单内部时关闭
    document.querySelectorAll('.menu-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // 为每个菜单触发器添加点击事件
    document.querySelectorAll('.section-menu .menu-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // 关闭其他打开的菜单
            document.querySelectorAll('.menu-dropdown.show').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });
            
            // 切换当前菜单
            dropdown.classList.toggle('show');
        });
    });

    // 点击页面其他地方关闭所有菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-dropdown') && !e.target.closest('.menu-trigger')) {
            document.querySelectorAll('.menu-dropdown.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // 防止点击菜单内部时关闭
    document.querySelectorAll('.menu-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // 肖像照片功能
    const portraitSection = document.querySelector('.editor-section .section-icon[data-icon="📷"]').closest('.editor-section');
    const portraitMenuTrigger = portraitSection.querySelector('.menu-trigger');
    const portraitMenuDropdown = portraitMenuTrigger.nextElementSibling;
    const togglePortraitVisibilityBtn = portraitMenuDropdown.querySelector('.toggle-portrait-visibility');
    const addPortraitBtn = portraitSection.querySelector('.add-portrait-btn');
    const addPortraitMenuItem = portraitMenuDropdown.querySelector('.add-portrait');
    const portraitModal = document.querySelector('.portrait-modal');
    const portraitInput = portraitModal.querySelector('.portrait-input');
    const portraitPreview = portraitModal.querySelector('.portrait-preview');
    const previewImage = portraitModal.querySelector('.preview-image');
    const uploadPlaceholder = portraitModal.querySelector('.upload-placeholder');
    const uploadBtn = portraitModal.querySelector('.upload-btn');
    const closePortraitModal = portraitModal.querySelector('.close-modal');
    const createPortraitBtn = portraitModal.querySelector('.create-btn');

    // 显示/隐藏肖像照片菜单
    portraitMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        portraitMenuDropdown.classList.toggle('show');
    });

    // 切换肖像照片可见性功能
    togglePortraitVisibilityBtn.addEventListener('click', function() {
        isPortraitVisible = !isPortraitVisible;
        const visibilityText = this.querySelector('.visibility-text');

        if (isPortraitVisible) {
            visibilityText.textContent = '隐藏照片';
        } else {
            visibilityText.textContent = '显示照片';
        }

        // 更新预览
        generatePreview();
        
        // 关闭菜单
        portraitMenuDropdown.classList.remove('show');
    });

    // 打开弹窗（通过按钮或菜单项）
    [addPortraitBtn, addPortraitMenuItem].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                portraitModal.style.display = 'flex';
                // 关闭菜单下拉框（如果是通过菜单项打开的）
                const dropdown = document.querySelector('.menu-dropdown.show');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });

    // 关闭弹窗
    closePortraitModal.addEventListener('click', function() {
        portraitModal.style.display = 'none';
        // 重置预览
        previewImage.style.display = 'none';
        uploadPlaceholder.style.display = 'flex';
        portraitInput.value = '';
    });

    // 点击弹窗外部关闭
    portraitModal.addEventListener('click', function(e) {
        if (e.target === portraitModal) {
            portraitModal.style.display = 'none';
            // 重置预览
            previewImage.style.display = 'none';
            uploadPlaceholder.style.display = 'flex';
            portraitInput.value = '';
        }
    });

    // 点击预览区域触发文件选择
    portraitPreview.addEventListener('click', function() {
        portraitInput.click();
    });

    // 点击上传按钮触发文件选择
    uploadBtn.addEventListener('click', function() {
        portraitInput.click();
    });

    // 处理文件选择
    portraitInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // 处理拖拽上传
    portraitPreview.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#666';
    });

    portraitPreview.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ccc';
    });

    portraitPreview.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ccc';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // 确认上传
    createPortraitBtn.addEventListener('click', function() {
        if (previewImage.src) {
            // 创建新的照片项
            const portraitItem = document.createElement('div');
            portraitItem.className = 'portrait-item';
            portraitItem.innerHTML = `
                <div class="portrait-content">
                    <img src="${previewImage.src}" alt="肖像照片" class="portrait-image">
                </div>
            `;

            // 将新照片添加到肖像照片区域
            const portraitBtn = document.querySelector('.add-portrait-btn');
            portraitBtn.parentNode.insertBefore(portraitItem, portraitBtn);

            // 更新预览
            generatePreview();

            // 关闭弹窗
            portraitModal.style.display = 'none';
            // 重置预览
            previewImage.style.display = 'none';
            uploadPlaceholder.style.display = 'flex';
            portraitInput.value = '';
        }
    });

    // 添加自定义字段功能
    const addFieldBtn = document.querySelector('.add-field-btn');
    const customFieldsContainer = document.querySelector('.custom-fields');
    const saveButton = document.querySelector('.save-custom-fields');

    addFieldBtn.addEventListener('click', function() {
        addCustomField();
    });

    function addCustomField() {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'custom-field';
        fieldDiv.draggable = true; // 添加可拖动属性
        
        fieldDiv.innerHTML = `
            <div class="custom-field-group">
                <input type="text" class="editor-input" placeholder="名称">
                <span style="color: #999;">:</span>
            </div>
            <div class="custom-field-group">
                <input type="text" class="editor-input" placeholder="值">
                <div class="custom-field-actions">
                    <button type="button" class="custom-field-btn" title="删除">✕</button>
                    <button type="button" class="custom-field-btn drag-handle" title="拖动">⋮</button>
                </div>
            </div>
        `;

        // 添加删除功能
        const deleteBtn = fieldDiv.querySelector('[title="删除"]');
        deleteBtn.addEventListener('click', function() {
            fieldDiv.remove();
        });

        // 拖拽相关事件处理
        const dragHandle = fieldDiv.querySelector('.drag-handle');
        let isDragging = false;
        let dragTimeout;

        // 长按开始拖动
        dragHandle.addEventListener('mousedown', function() {
            dragTimeout = setTimeout(() => {
                isDragging = true;
                fieldDiv.classList.add('dragging');
            }, 200); // 200ms 的长按时间
        });

        // 松开鼠标取消拖动
        dragHandle.addEventListener('mouseup', function() {
            clearTimeout(dragTimeout);
            isDragging = false;
            fieldDiv.classList.remove('dragging');
        });

        // 拖动开始事件
        fieldDiv.addEventListener('dragstart', function(e) {
            if (!isDragging) {
                e.preventDefault();
                return;
            }
            fieldDiv.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        // 拖动结束事件
        fieldDiv.addEventListener('dragend', function() {
            fieldDiv.classList.remove('dragging');
            isDragging = false;
        });

        // 将新字段添加到容器中
        customFieldsContainer.appendChild(fieldDiv);
        
        // 显示保存按钮
        saveButton.classList.add('show');

        // 聚焦到第一个输入框
        fieldDiv.querySelector('input').focus();
    }

    // 容器的拖动事件处理
    customFieldsContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        if (!draggingItem) return;

        const siblings = [...customFieldsContainer.querySelectorAll('.custom-field:not(.dragging)')];
        const nextSibling = siblings.find(sibling => {
            const box = sibling.getBoundingClientRect();
            const offset = e.clientY - box.top - box.height / 2;
            return offset < 0;
        });

        if (nextSibling) {
            customFieldsContainer.insertBefore(draggingItem, nextSibling);
        } else {
            customFieldsContainer.appendChild(draggingItem);
        }
    });

    // 监听回车键
    customFieldsContainer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 阻止表单提交
            const currentField = e.target.closest('.custom-field');
            const inputs = currentField.querySelectorAll('input');
            const lastInput = inputs[inputs.length - 1];

            if (e.target === lastInput) {
                // 如果在最后一个输入框按回车，添加新字段
                addCustomField();
            } else {
                // 否则跳到下一个输入框
                const nextInput = e.target.closest('.custom-field-group').nextElementSibling?.querySelector('input');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    });

    // 添加保存按钮的点击事件
    saveButton.addEventListener('click', function() {
        const customFields = [];
        const fieldDivs = customFieldsContainer.querySelectorAll('.custom-field');
        
        fieldDivs.forEach(field => {
            const inputs = field.querySelectorAll('input');
            customFields.push({
                name: inputs[0].value,
                value: inputs[1].value
            });
        });

        // 保存数据
        console.log('保存的自定义字段:', customFields);
        
        // 可以在这里添加保存成功的提示
        alert('保存成功！');
    });

    // 当删除所有自定义字段时隐藏保存按钮
    const observer = new MutationObserver(function(mutations) {
        const hasCustomFields = customFieldsContainer.querySelector('.custom-field');
        saveButton.classList.toggle('show', hasCustomFields);
    });

    observer.observe(customFieldsContainer, {
        childList: true,
        subtree: true
    });

    // 富文本编辑器功能
    const editor = document.querySelector('.editor-content-area');
    const toolbar = document.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    editor.contentEditable = 'true';
    editor.designMode = 'on';

    // 工具栏按钮点击处理
    toolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateToolbarState();
    });

    // 更新工具栏按钮状态
    function updateToolbarState() {
        const buttons = toolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    editor.addEventListener('input', updateToolbarState);
    editor.addEventListener('click', updateToolbarState);
    editor.addEventListener('keyup', updateToolbarState);

    // 处理快捷键
    editor.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold', false, null);
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic', false, null);
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline', false, null);
                    break;
                case 'z':
                    e.preventDefault();
                    document.execCommand('undo', false, null);
                    break;
            }
            updateToolbarState();
        }
    });

    // 弹窗相关功能
    const addProfileBtn = document.querySelector('.add-profile-btn');
    const profileModal = document.querySelector('.profile-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const createBtn = document.querySelector('.create-btn');
    const copyLinkBtn = document.querySelector('.copy-link-btn');

    // 打开弹窗
    addProfileBtn.addEventListener('click', function() {
        profileModal.style.display = 'flex';
    });

    // 关闭弹窗
    closeModalBtn.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    profileModal.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    copyLinkBtn.addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 修改创建按钮功能
    createBtn.addEventListener('click', function() {
        const network = document.querySelector('.modal-input[placeholder="GitHub"]').value;
        const username = document.querySelector('.modal-input[placeholder="john.doe"]').value;
        const website = document.querySelector('.modal-input[placeholder="https://github.com/johndoe"]').value;
        const icon = document.querySelector('.modal-input[placeholder="github"]').value;

        // 创建新的个人简介条目
        const profileItem = document.createElement('div');
        profileItem.className = 'profile-item';
        profileItem.innerHTML = `
            <div class="profile-content">
                <span class="profile-title">${network}</span>
                <span class="profile-subtitle">${username}</span>
            </div>
            <div class="profile-actions">
                <button type="button" class="profile-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到个人简介区域
        const profileSection = document.querySelector('.add-profile-btn').parentElement;
        profileSection.insertBefore(profileItem, profileSection.querySelector('.add-profile-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        profileModal.style.display = 'none';

        // 清空输入框
        profileModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
    });

    // 菜单相关功能
    const menuTrigger = document.querySelector('.menu-trigger');
    const menuDropdown = document.querySelector('.menu-dropdown');
    const addMenuItem = document.querySelector('.menu-item.add-item');
    const toggleVisibilityItem = document.querySelector('.menu-item.toggle-visibility');
    let isProfileVisible = true;

    // 显示/隐藏下拉菜单
    menuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        menuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        menuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    menuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 增加一项功能
    addMenuItem.addEventListener('click', function() {
        profileModal.style.display = 'flex';
        menuDropdown.classList.remove('show');
    });

    // 切换可见性功能
    toggleVisibilityItem.addEventListener('click', function() {
        isProfileVisible = !isProfileVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewProfiles = document.querySelector('.preview-profiles');

        if (isProfileVisible) {
            visibilityText.textContent = '隐藏简介';
            if (previewProfiles) {
                previewProfiles.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示简介';
            if (previewProfiles) {
                previewProfiles.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isProfileVisible) {
                const previewProfiles = document.querySelector('.preview-profiles');
                if (previewProfiles) {
                    previewProfiles.style.display = 'none';
                }
            }
        };

        generatePreview();
    });

    // 工作经验弹窗相关功能
    const addExperienceBtn = document.querySelector('.add-experience-btn');
    const addExperienceMenuItem = document.querySelector('.menu-item.add-experience');
    const experienceModal = document.querySelector('.experience-modal');
    const closeExperienceModal = experienceModal.querySelector('.close-modal');
    const createExperienceBtn = experienceModal.querySelector('.create-btn');

    // 工作经验弹窗中的富文本编辑器功能
    const experienceEditor = experienceModal.querySelector('.editor-content-area');
    const experienceToolbar = experienceModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    experienceEditor.contentEditable = 'true';
    experienceEditor.designMode = 'on';

    // 工具栏按钮点击处理
    experienceToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateExperienceToolbarState();
    });

    // 更新工具栏按钮状态
    function updateExperienceToolbarState() {
        const buttons = experienceToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    experienceEditor.addEventListener('input', updateExperienceToolbarState);
    experienceEditor.addEventListener('click', updateExperienceToolbarState);
    experienceEditor.addEventListener('keyup', updateExperienceToolbarState);

    // 处理快捷键
    experienceEditor.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold', false, null);
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic', false, null);
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline', false, null);
                    break;
                case 'z':
                    e.preventDefault();
                    document.execCommand('undo', false, null);
                    break;
            }
            updateExperienceToolbarState();
        }
    });

    // 打开弹窗（通过按钮或菜单项）
    [addExperienceBtn, addExperienceMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            experienceModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeExperienceModal.addEventListener('click', function() {
        experienceModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    experienceModal.addEventListener('click', function(e) {
        if (e.target === experienceModal) {
            experienceModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    experienceModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 修改创建工作经验按钮功能
    createExperienceBtn.addEventListener('click', function() {
        // 获取表单数据
        const company = experienceModal.querySelector('input[placeholder="请输入公司名称"]').value;
        const position = experienceModal.querySelector('input[placeholder="请输入职位名称"]').value;
        const date = experienceModal.querySelector('input[placeholder="2023 年 3 月至今"]').value;
        const location = experienceModal.querySelector('input[placeholder="请输入工作地点"]').value;
        const website = experienceModal.querySelector('input[placeholder="请输入公司网站"]').value;
        const summary = experienceModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的工作经验条目
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <div class="experience-content">
                <h3 class="experience-company">${company}</h3>
                <div class="experience-details">
                    <span class="experience-position">${position}</span>
                    <span class="experience-date">${date}</span>
                    <span class="experience-location">${location}</span>
                    <span class="experience-website" style="display: none;">${website}</span>
                    <div class="experience-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="experience-actions">
                <button type="button" class="experience-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到工作经验区域
        const experienceSection = document.querySelector('.add-experience-btn').parentElement;
        experienceSection.insertBefore(experienceItem, experienceSection.querySelector('.add-experience-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        experienceModal.style.display = 'none';

        // 清空输入框
        experienceModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        experienceModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 工作经验菜单相关功能
    const experienceSection = document.querySelector('.editor-section .section-icon[data-icon="💼"]').closest('.editor-section');
    const experienceMenuTrigger = experienceSection.querySelector('.menu-trigger');
    const experienceMenuDropdown = experienceMenuTrigger.nextElementSibling;
    const toggleExperienceVisibilityItem = document.querySelector('.menu-item.toggle-experience-visibility');
    let isExperienceVisible = true;

    // 显示/隐藏工作经验菜单
    experienceMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        experienceMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        experienceMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    experienceMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换工作经验可见性功能
    toggleExperienceVisibilityItem.addEventListener('click', function() {
        isExperienceVisible = !isExperienceVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewExperiences = document.querySelector('.preview-experiences');

        if (isExperienceVisible) {
            visibilityText.textContent = '隐藏经验';
            if (previewExperiences) {
                previewExperiences.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示经验';
            if (previewExperiences) {
                previewExperiences.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isExperienceVisible) {
                const previewExperiences = document.querySelector('.preview-experiences');
                if (previewExperiences) {
                    previewExperiences.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        experienceMenuDropdown.classList.remove('show');
    });

    // 教育经历弹窗相关功能
    const addEducationBtn = document.querySelector('.add-education-btn');
    const addEducationMenuItem = document.querySelector('.menu-item.add-education');
    const educationModal = document.querySelector('.education-modal');
    const closeEducationModal = educationModal.querySelector('.close-modal');
    const createEducationBtn = educationModal.querySelector('.create-btn');

    // 教育经历弹窗中的富文本编辑器功能
    const educationEditor = educationModal.querySelector('.editor-content-area');
    const educationToolbar = educationModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    educationEditor.contentEditable = 'true';
    educationEditor.designMode = 'on';

    // 工具栏按钮点击处理
    educationToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateEducationToolbarState();
    });

    // 更新工具栏按钮状态
    function updateEducationToolbarState() {
        const buttons = educationToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    educationEditor.addEventListener('input', updateEducationToolbarState);
    educationEditor.addEventListener('click', updateEducationToolbarState);
    educationEditor.addEventListener('keyup', updateEducationToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addEducationBtn, addEducationMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            educationModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeEducationModal.addEventListener('click', function() {
        educationModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    educationModal.addEventListener('click', function(e) {
        if (e.target === educationModal) {
            educationModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    educationModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 创建按钮功能
    createEducationBtn.addEventListener('click', function() {
        // 获取表单数据
        const school = educationModal.querySelector('input[placeholder="请输入学校名称"]').value;
        const degree = educationModal.querySelector('input[placeholder="请输入学位或证书类型"]').value;
        const field = educationModal.querySelector('input[placeholder="请输入专业或研究方向"]').value;
        const score = educationModal.querySelector('input[placeholder="9.2 GPA"]').value;
        const date = educationModal.querySelector('input[placeholder="2023 年 3 月至今"]').value;
        const website = educationModal.querySelector('input[placeholder="请输入学校网站"]').value;
        const summary = educationModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的教育经历条目
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <div class="education-content">
                <h3 class="education-school">${school}</h3>
                <div class="education-details">
                    <span class="education-degree">${degree}</span>
                    <span class="education-field">${field}</span>
                    <span class="education-score">${score}</span>
                    <span class="education-date">${date}</span>
                    <span class="education-website" style="display: none;">${website}</span>
                    <div class="education-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="education-actions">
                <button type="button" class="education-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到教育经历区域
        const educationSection = document.querySelector('.add-education-btn').parentElement;
        educationSection.insertBefore(educationItem, educationSection.querySelector('.add-education-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        educationModal.style.display = 'none';

        // 清空输入框
        educationModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        educationModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 教育经历菜单相关功能
    const educationSection = document.querySelector('.editor-section .section-icon[data-icon="🎓"]').closest('.editor-section');
    const educationMenuTrigger = educationSection.querySelector('.menu-trigger');
    const educationMenuDropdown = educationMenuTrigger.nextElementSibling;
    const toggleEducationVisibilityItem = document.querySelector('.menu-item.toggle-education-visibility');
    let isEducationVisible = true;

    // 显示/隐藏教育经历菜单
    educationMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        educationMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        educationMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    educationMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换教育经历可见性功能
    toggleEducationVisibilityItem.addEventListener('click', function() {
        isEducationVisible = !isEducationVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewEducations = document.querySelector('.preview-educations');

        if (isEducationVisible) {
            visibilityText.textContent = '隐藏经历';
            if (previewEducations) {
                previewEducations.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示经历';
            if (previewEducations) {
                previewEducations.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isEducationVisible) {
                const previewEducations = document.querySelector('.preview-educations');
                if (previewEducations) {
                    previewEducations.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        educationMenuDropdown.classList.remove('show');
    });

    // 专业技能弹窗相关功能
    const addSkillBtn = document.querySelector('.add-skill-btn');
    const addSkillMenuItem = document.querySelector('.menu-item.add-skill');
    const skillModal = document.querySelector('.skill-modal');
    const closeSkillModal = skillModal.querySelector('.close-modal');
    const createSkillBtn = skillModal.querySelector('.create-btn');
    const skillRange = skillModal.querySelector('.modal-range');
    const rangeValue = skillModal.querySelector('.range-value');

    // 更新等级值显示
    skillRange.addEventListener('input', function() {
        rangeValue.textContent = this.value;
    });

    // 打开弹窗（通过按钮或菜单项）
    [addSkillBtn, addSkillMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            skillModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeSkillModal.addEventListener('click', function() {
        skillModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    skillModal.addEventListener('click', function(e) {
        if (e.target === skillModal) {
            skillModal.style.display = 'none';
        }
    });

    // 创建按钮功能
    createSkillBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = skillModal.querySelector('input[placeholder="请输入技能名称"]').value;
        const description = skillModal.querySelector('input[placeholder="请输入技能描述"]').value;
        const level = skillRange.value;
        const keywords = skillModal.querySelector('input[placeholder="您可以通过用逗号或回车分隔来添加多个关键字"]').value;

        // 创建新的技能条目
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-content">
                <h3 class="skill-name">${name}</h3>
                <div class="skill-details">
                    <span class="skill-description">${description}</span>
                    <span class="skill-level" style="display: none;">${level}</span>
                    <span class="skill-keywords" style="display: none;">${keywords}</span>
                </div>
            </div>
            <div class="skill-actions">
                <button type="button" class="skill-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到技能区域
        const skillSection = document.querySelector('.add-skill-btn').parentElement;
        skillSection.insertBefore(skillItem, skillSection.querySelector('.add-skill-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        skillModal.style.display = 'none';

        // 清空输入框
        skillModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        skillRange.value = 5;
        rangeValue.textContent = '5';
    });

    // 专业技能菜单相关功能
    const skillSection = document.querySelector('.editor-section .section-icon[data-icon="⚡"]').closest('.editor-section');
    const skillMenuTrigger = skillSection.querySelector('.menu-trigger');
    const skillMenuDropdown = skillMenuTrigger.nextElementSibling;
    const toggleSkillVisibilityItem = document.querySelector('.menu-item.toggle-skill-visibility');
    let isSkillVisible = true;

    // 显示/隐藏专业技能菜单
    skillMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        skillMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        skillMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    skillMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换专业技能可见性功能
    toggleSkillVisibilityItem.addEventListener('click', function() {
        isSkillVisible = !isSkillVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewSkills = document.querySelector('.preview-skills');

        if (isSkillVisible) {
            visibilityText.textContent = '隐藏技能';
            if (previewSkills) {
                previewSkills.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示技能';
            if (previewSkills) {
                previewSkills.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isSkillVisible) {
                const previewSkills = document.querySelector('.preview-skills');
                if (previewSkills) {
                    previewSkills.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        skillMenuDropdown.classList.remove('show');
    });

    // 语言情况弹窗相关功能
    const addLanguageBtn = document.querySelector('.add-language-btn');
    const addLanguageMenuItem = document.querySelector('.menu-item.add-language');
    const languageModal = document.querySelector('.language-modal');
    const closeLanguageModal = languageModal.querySelector('.close-modal');
    const createLanguageBtn = languageModal.querySelector('.create-btn');
    const languageRange = languageModal.querySelector('.modal-range');
    const languageRangeValue = languageModal.querySelector('.range-value');

    // 更新等级值显示
    languageRange.addEventListener('input', function() {
        languageRangeValue.textContent = this.value;
    });

    // 打开弹窗（通过按钮或菜单项）
    [addLanguageBtn, addLanguageMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            languageModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeLanguageModal.addEventListener('click', function() {
        languageModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    languageModal.addEventListener('click', function(e) {
        if (e.target === languageModal) {
            languageModal.style.display = 'none';
        }
    });

    // 创建按钮功能
    createLanguageBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = languageModal.querySelector('input[placeholder="请输入语言名称"]').value;
        const description = languageModal.querySelector('input[placeholder="请输入语言描述"]').value;
        const level = languageRange.value;

        // 创建新的语言条目
        const languageItem = document.createElement('div');
        languageItem.className = 'language-item';
        languageItem.innerHTML = `
            <div class="language-content">
                <h3 class="language-name">${name}</h3>
                <div class="language-details">
                    <span class="language-description">${description}</span>
                    <span class="language-level" style="display: none;">${level}</span>
                </div>
            </div>
            <div class="language-actions">
                <button type="button" class="language-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到语言区域
        const languageSection = document.querySelector('.add-language-btn').parentElement;
        languageSection.insertBefore(languageItem, languageSection.querySelector('.add-language-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        languageModal.style.display = 'none';

        // 清空输入框
        languageModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        languageRange.value = 5;
        languageRangeValue.textContent = '5';
    });

    // 语言情况菜单相关功能
    const languageSection = document.querySelector('.editor-section .section-icon[data-icon="🗣"]').closest('.editor-section');
    const languageMenuTrigger = languageSection.querySelector('.menu-trigger');
    const languageMenuDropdown = languageMenuTrigger.nextElementSibling;
    const toggleLanguageVisibilityItem = document.querySelector('.menu-item.toggle-language-visibility');
    let isLanguageVisible = true;

    // 显示/隐藏语言情况菜单
    languageMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        languageMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        languageMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    languageMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换语言情况可见性功能
    toggleLanguageVisibilityItem.addEventListener('click', function() {
        isLanguageVisible = !isLanguageVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewLanguages = document.querySelector('.preview-languages');

        if (isLanguageVisible) {
            visibilityText.textContent = '隐藏语言';
            if (previewLanguages) {
                previewLanguages.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示语言';
            if (previewLanguages) {
                previewLanguages.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isLanguageVisible) {
                const previewLanguages = document.querySelector('.preview-languages');
                if (previewLanguages) {
                    previewLanguages.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        languageMenuDropdown.classList.remove('show');
    });

    // 奖品奖项弹窗相关功能
    const addAwardBtn = document.querySelector('.add-award-btn');
    const addAwardMenuItem = document.querySelector('.menu-item.add-award');
    const awardModal = document.querySelector('.award-modal');
    const closeAwardModal = awardModal.querySelector('.close-modal');
    const createAwardBtn = awardModal.querySelector('.create-btn');

    // 奖品奖项弹窗中的富文本编辑器功能
    const awardEditor = awardModal.querySelector('.editor-content-area');
    const awardToolbar = awardModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    awardEditor.contentEditable = 'true';
    awardEditor.designMode = 'on';

    // 工具栏按钮点击处理
    awardToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateAwardToolbarState();
    });

    // 更新工具栏按钮状态
    function updateAwardToolbarState() {
        const buttons = awardToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    awardEditor.addEventListener('input', updateAwardToolbarState);
    awardEditor.addEventListener('click', updateAwardToolbarState);
    awardEditor.addEventListener('keyup', updateAwardToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addAwardBtn, addAwardMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            awardModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeAwardModal.addEventListener('click', function() {
        awardModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    awardModal.addEventListener('click', function(e) {
        if (e.target === awardModal) {
            awardModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    awardModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 修改创建奖品奖项按钮功能
    createAwardBtn.addEventListener('click', function() {
        // 获取表单数据
        const title = awardModal.querySelector('input[placeholder="请输入奖项标题"]').value;
        const issuer = awardModal.querySelector('input[placeholder="请输入授予者"]').value;
        const date = awardModal.querySelector('input[placeholder="2023 年 3 月"]').value;
        const website = awardModal.querySelector('input[placeholder="请输入相关网站"]').value;
        const summary = awardModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的奖项条目
        const awardItem = document.createElement('div');
        awardItem.className = 'award-item';
        awardItem.innerHTML = `
            <div class="award-content">
                <h3 class="award-title">${title}</h3>
                <div class="award-details">
                    <span class="award-issuer">${issuer}</span>
                    <span class="award-date">${date}</span>
                    <span class="award-website" style="display: none;">${website}</span>
                    <div class="award-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="award-actions">
                <button type="button" class="award-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到奖项区域
        const awardSection = document.querySelector('.add-award-btn').parentElement;
        awardSection.insertBefore(awardItem, awardSection.querySelector('.add-award-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        awardModal.style.display = 'none';

        // 清空输入框
        awardModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        awardModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 奖品奖项菜单相关功能
    const awardSection = document.querySelector('.editor-section .section-icon[data-icon="🏆"]').closest('.editor-section');
    const awardMenuTrigger = awardSection.querySelector('.menu-trigger');
    const awardMenuDropdown = awardMenuTrigger.nextElementSibling;
    const toggleAwardVisibilityItem = document.querySelector('.menu-item.toggle-award-visibility');
    let isAwardVisible = true;

    // 显示/隐藏奖品奖项菜单
    awardMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        awardMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        awardMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    awardMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换奖品奖项可见性功能
    toggleAwardVisibilityItem.addEventListener('click', function() {
        isAwardVisible = !isAwardVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewAwards = document.querySelector('.preview-awards');

        if (isAwardVisible) {
            visibilityText.textContent = '隐藏奖项';
            if (previewAwards) {
                previewAwards.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示奖项';
            if (previewAwards) {
                previewAwards.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isAwardVisible) {
                const previewAwards = document.querySelector('.preview-awards');
                if (previewAwards) {
                    previewAwards.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        awardMenuDropdown.classList.remove('show');
    });

    // 专业证书弹窗相关功能
    const addCertificationBtn = document.querySelector('.add-certification-btn');
    const addCertificationMenuItem = document.querySelector('.menu-item.add-certification');
    const certificationModal = document.querySelector('.certification-modal');
    const closeCertificationModal = certificationModal.querySelector('.close-modal');
    const createCertificationBtn = certificationModal.querySelector('.create-btn');

    // 专业证书弹窗中的富文本编辑器功能
    const certificationEditor = certificationModal.querySelector('.editor-content-area');
    const certificationToolbar = certificationModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    certificationEditor.contentEditable = 'true';
    certificationEditor.designMode = 'on';

    // 工具栏按钮点击处理
    certificationToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateCertificationToolbarState();
    });

    // 更新工具栏按钮状态
    function updateCertificationToolbarState() {
        const buttons = certificationToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    certificationEditor.addEventListener('input', updateCertificationToolbarState);
    certificationEditor.addEventListener('click', updateCertificationToolbarState);
    certificationEditor.addEventListener('keyup', updateCertificationToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addCertificationBtn, addCertificationMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            certificationModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeCertificationModal.addEventListener('click', function() {
        certificationModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    certificationModal.addEventListener('click', function(e) {
        if (e.target === certificationModal) {
            certificationModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    certificationModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 修改创建专业证书按钮功能
    createCertificationBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = certificationModal.querySelector('input[placeholder="请输入证书名称"]').value;
        const issuer = certificationModal.querySelector('input[placeholder="请输入签发机构"]').value;
        const date = certificationModal.querySelector('input[placeholder="2023 年 3 月"]').value;
        const website = certificationModal.querySelector('input[placeholder="https://udemy.com/certificate/"]').value;
        const summary = certificationModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的证书条目
        const certificationItem = document.createElement('div');
        certificationItem.className = 'certification-item';
        certificationItem.innerHTML = `
            <div class="certification-content">
                <h3 class="certification-name">${name}</h3>
                <div class="certification-details">
                    <span class="certification-issuer">${issuer}</span>
                    <span class="certification-date">${date}</span>
                    <span class="certification-website" style="display: none;">${website}</span>
                    <div class="certification-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="certification-actions">
                <button type="button" class="certification-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到证书区域
        const certificationSection = document.querySelector('.add-certification-btn').parentElement;
        certificationSection.insertBefore(certificationItem, certificationSection.querySelector('.add-certification-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        certificationModal.style.display = 'none';

        // 清空输入框
        certificationModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        certificationModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 专业证书菜单相关功能
    const certificationSection = document.querySelector('.editor-section .section-icon[data-icon="📜"]').closest('.editor-section');
    const certificationMenuTrigger = certificationSection.querySelector('.menu-trigger');
    const certificationMenuDropdown = certificationMenuTrigger.nextElementSibling;
    const toggleCertificationVisibilityItem = document.querySelector('.menu-item.toggle-certification-visibility');
    let isCertificationVisible = true;

    // 显示/隐藏专业证书菜单
    certificationMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        certificationMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        certificationMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    certificationMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换专业证书可见性功能
    toggleCertificationVisibilityItem.addEventListener('click', function() {
        isCertificationVisible = !isCertificationVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewCertifications = document.querySelector('.preview-certifications');

        if (isCertificationVisible) {
            visibilityText.textContent = '隐藏证书';
            if (previewCertifications) {
                previewCertifications.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示证书';
            if (previewCertifications) {
                previewCertifications.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isCertificationVisible) {
                const previewCertifications = document.querySelector('.preview-certifications');
                if (previewCertifications) {
                    previewCertifications.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        certificationMenuDropdown.classList.remove('show');
    });

    // 兴趣爱好弹窗相关功能
    const addInterestBtn = document.querySelector('.add-interest-btn');
    const addInterestMenuItem = document.querySelector('.menu-item.add-interest');
    const interestModal = document.querySelector('.interest-modal');
    const closeInterestModal = interestModal.querySelector('.close-modal');
    const createInterestBtn = interestModal.querySelector('.create-btn');

    // 打开弹窗（通过按钮或菜单项）
    [addInterestBtn, addInterestMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            interestModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeInterestModal.addEventListener('click', function() {
        interestModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    interestModal.addEventListener('click', function(e) {
        if (e.target === interestModal) {
            interestModal.style.display = 'none';
        }
    });

    // 创建按钮功能
    createInterestBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = interestModal.querySelector('input[placeholder="请输入爱好名称"]').value;
        const keywords = interestModal.querySelector('input[placeholder="您可以通过用逗号或回车分隔来添加多个关键字"]').value;

        // 创建新的爱好条目
        const interestItem = document.createElement('div');
        interestItem.className = 'interest-item';
        interestItem.innerHTML = `
            <div class="interest-content">
                <h3 class="interest-name">${name}</h3>
                <div class="interest-details">
                    <span class="interest-keywords" style="display: none;">${keywords}</span>
                </div>
            </div>
            <div class="interest-actions">
                <button type="button" class="interest-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到爱好区域
        const interestSection = document.querySelector('.add-interest-btn').parentElement;
        interestSection.insertBefore(interestItem, interestSection.querySelector('.add-interest-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        interestModal.style.display = 'none';

        // 清空输入框
        interestModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
    });

    // 兴趣爱好菜单相关功能
    const interestSection = document.querySelector('.editor-section .section-icon[data-icon="🎮"]').closest('.editor-section');
    const interestMenuTrigger = interestSection.querySelector('.menu-trigger');
    const interestMenuDropdown = interestMenuTrigger.nextElementSibling;
    const toggleInterestVisibilityItem = document.querySelector('.menu-item.toggle-interest-visibility');
    let isInterestVisible = true;

    // 显示/隐藏兴趣爱好菜单
    interestMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        interestMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        interestMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    interestMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换兴趣爱好可见性功能
    toggleInterestVisibilityItem.addEventListener('click', function() {
        isInterestVisible = !isInterestVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewInterests = document.querySelector('.preview-interests');

        if (isInterestVisible) {
            visibilityText.textContent = '隐藏兴趣';
            if (previewInterests) {
                previewInterests.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示兴趣';
            if (previewInterests) {
                previewInterests.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isInterestVisible) {
                const previewInterests = document.querySelector('.preview-interests');
                if (previewInterests) {
                    previewInterests.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        interestMenuDropdown.classList.remove('show');
    });

    // 项目经验弹窗相关功能
    const addProjectBtn = document.querySelector('.add-project-btn');
    const addProjectMenuItem = document.querySelector('.menu-item.add-project');
    const projectModal = document.querySelector('.project-modal');
    const closeProjectModal = projectModal.querySelector('.close-modal');
    const createProjectBtn = projectModal.querySelector('.create-btn');

    // 项目经验弹窗中的富文本编辑器功能
    const projectEditor = projectModal.querySelector('.editor-content-area');
    const projectToolbar = projectModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    projectEditor.contentEditable = 'true';
    projectEditor.designMode = 'on';

    // 工具栏按钮点击处理
    projectToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateProjectToolbarState();
    });

    // 更新工具栏按钮状态
    function updateProjectToolbarState() {
        const buttons = projectToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    projectEditor.addEventListener('input', updateProjectToolbarState);
    projectEditor.addEventListener('click', updateProjectToolbarState);
    projectEditor.addEventListener('keyup', updateProjectToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addProjectBtn, addProjectMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            projectModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeProjectModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    projectModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 创建按钮功能
    createProjectBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = projectModal.querySelector('input[placeholder="请输入项目名称"]').value;
        const description = projectModal.querySelector('input[placeholder="请输入项目描述"]').value;
        const date = projectModal.querySelector('input[placeholder="2023 年 3 月至今"]').value;
        const website = projectModal.querySelector('input[placeholder="https://rxresu.me"]').value;
        const summary = projectModal.querySelector('.editor-content-area').innerHTML;
        const keywords = projectModal.querySelector('input[placeholder="您可以通过用逗号或回车分隔来添加多个关键字"]').value;

        // 创建新的项目条目
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="project-content">
                <h3 class="project-name">${name}</h3>
                <div class="project-details">
                    <span class="project-description">${description}</span>
                    <span class="project-date">${date}</span>
                    <span class="project-website" style="display: none;">${website}</span>
                    <div class="project-summary" style="display: none;">${summary}</div>
                    <span class="project-keywords" style="display: none;">${keywords}</span>
                </div>
            </div>
            <div class="project-actions">
                <button type="button" class="project-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到项目区域
        const projectSection = document.querySelector('.add-project-btn').parentElement;
        projectSection.insertBefore(projectItem, projectSection.querySelector('.add-project-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        projectModal.style.display = 'none';

        // 清空输入框
        projectModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        projectModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 项目经验菜单相关功能
    const projectSection = document.querySelector('.editor-section .section-icon[data-icon="🚀"]').closest('.editor-section');
    const projectMenuTrigger = projectSection.querySelector('.menu-trigger');
    const projectMenuDropdown = projectMenuTrigger.nextElementSibling;
    const toggleProjectVisibilityItem = document.querySelector('.menu-item.toggle-project-visibility');
    let isProjectVisible = true;

    // 显示/隐藏项目经验菜单
    projectMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        projectMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        projectMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    projectMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换项目经验可见性功能
    toggleProjectVisibilityItem.addEventListener('click', function() {
        isProjectVisible = !isProjectVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewProjects = document.querySelector('.preview-projects');

        if (isProjectVisible) {
            visibilityText.textContent = '隐藏项目';
            if (previewProjects) {
                previewProjects.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示项目';
            if (previewProjects) {
                previewProjects.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isProjectVisible) {
                const previewProjects = document.querySelector('.preview-projects');
                if (previewProjects) {
                    previewProjects.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        projectMenuDropdown.classList.remove('show');
    });

    // 发表作品弹窗相关功能
    const addPublicationBtn = document.querySelector('.add-publication-btn');
    const addPublicationMenuItem = document.querySelector('.menu-item.add-publication');
    const publicationModal = document.querySelector('.publication-modal');
    const closePublicationModal = publicationModal.querySelector('.close-modal');
    const createPublicationBtn = publicationModal.querySelector('.create-btn');

    // 发表作品弹窗中的富文本编辑器功能
    const publicationEditor = publicationModal.querySelector('.editor-content-area');
    const publicationToolbar = publicationModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    publicationEditor.contentEditable = 'true';
    publicationEditor.designMode = 'on';

    // 工具栏按钮点击处理
    publicationToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updatePublicationToolbarState();
    });

    // 更新工具栏按钮状态
    function updatePublicationToolbarState() {
        const buttons = publicationToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    publicationEditor.addEventListener('input', updatePublicationToolbarState);
    publicationEditor.addEventListener('click', updatePublicationToolbarState);
    publicationEditor.addEventListener('keyup', updatePublicationToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addPublicationBtn, addPublicationMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            publicationModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closePublicationModal.addEventListener('click', function() {
        publicationModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    publicationModal.addEventListener('click', function(e) {
        if (e.target === publicationModal) {
            publicationModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    publicationModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 创建按钮功能
    createPublicationBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = publicationModal.querySelector('input[placeholder="请输入作品名称"]').value;
        const publisher = publicationModal.querySelector('input[placeholder="请输入发布者"]').value;
        const date = publicationModal.querySelector('input[placeholder="2023 年 3 月"]').value;
        const website = publicationModal.querySelector('input[placeholder="https://rxresu.me"]').value;
        const summary = publicationModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的作品条目
        const publicationItem = document.createElement('div');
        publicationItem.className = 'publication-item';
        publicationItem.innerHTML = `
            <div class="publication-content">
                <h3 class="publication-name">${name}</h3>
                <div class="publication-details">
                    <span class="publication-publisher">${publisher}</span>
                    <span class="publication-date">${date}</span>
                    <span class="publication-website" style="display: none;">${website}</span>
                    <div class="publication-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="publication-actions">
                <button type="button" class="publication-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到作品区域
        const publicationSection = document.querySelector('.add-publication-btn').parentElement;
        publicationSection.insertBefore(publicationItem, publicationSection.querySelector('.add-publication-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        publicationModal.style.display = 'none';

        // 清空输入框
        publicationModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        publicationModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 发表作品菜单相关功能
    const publicationSection = document.querySelector('.editor-section .section-icon[data-icon="📝"]').closest('.editor-section');
    const publicationMenuTrigger = publicationSection.querySelector('.menu-trigger');
    const publicationMenuDropdown = publicationMenuTrigger.nextElementSibling;
    const togglePublicationVisibilityItem = document.querySelector('.menu-item.toggle-publication-visibility');
    let isPublicationVisible = true;

    // 显示/隐藏发表作品菜单
    publicationMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        publicationMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        publicationMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    publicationMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换发表作品可见性功能
    togglePublicationVisibilityItem.addEventListener('click', function() {
        isPublicationVisible = !isPublicationVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewPublications = document.querySelector('.preview-publications');

        if (isPublicationVisible) {
            visibilityText.textContent = '隐藏作品';
            if (previewPublications) {
                previewPublications.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示作品';
            if (previewPublications) {
                previewPublications.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isPublicationVisible) {
                const previewPublications = document.querySelector('.preview-publications');
                if (previewPublications) {
                    previewPublications.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        publicationMenuDropdown.classList.remove('show');
    });

    // 志愿经历弹窗相关功能
    const addVolunteerBtn = document.querySelector('.add-volunteer-btn');
    const addVolunteerMenuItem = document.querySelector('.menu-item.add-volunteer');
    const volunteerModal = document.querySelector('.volunteer-modal');
    const closeVolunteerModal = volunteerModal.querySelector('.close-modal');
    const createVolunteerBtn = volunteerModal.querySelector('.create-btn');

    // 志愿经历弹窗中的富文本编辑器功能
    const volunteerEditor = volunteerModal.querySelector('.editor-content-area');
    const volunteerToolbar = volunteerModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    volunteerEditor.contentEditable = 'true';
    volunteerEditor.designMode = 'on';

    // 工具栏按钮点击处理
    volunteerToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateVolunteerToolbarState();
    });

    // 更新工具栏按钮状态
    function updateVolunteerToolbarState() {
        const buttons = volunteerToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    volunteerEditor.addEventListener('input', updateVolunteerToolbarState);
    volunteerEditor.addEventListener('click', updateVolunteerToolbarState);
    volunteerEditor.addEventListener('keyup', updateVolunteerToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addVolunteerBtn, addVolunteerMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            volunteerModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeVolunteerModal.addEventListener('click', function() {
        volunteerModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    volunteerModal.addEventListener('click', function(e) {
        if (e.target === volunteerModal) {
            volunteerModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    volunteerModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 创建按钮功能
    createVolunteerBtn.addEventListener('click', function() {
        // 获取表单数据
        const organization = volunteerModal.querySelector('input[placeholder="请输入组织名称"]').value;
        const position = volunteerModal.querySelector('input[placeholder="请输入职位名称"]').value;
        const date = volunteerModal.querySelector('input[placeholder="2023 年 3 月至今"]').value;
        const location = volunteerModal.querySelector('input[placeholder="请输入地点"]').value;
        const website = volunteerModal.querySelector('input[placeholder="https://rxresu.me"]').value;
        const summary = volunteerModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的志愿经历条目
        const volunteerItem = document.createElement('div');
        volunteerItem.className = 'volunteer-item';
        volunteerItem.innerHTML = `
            <div class="volunteer-content">
                <h3 class="volunteer-name">${organization}</h3>
                <div class="volunteer-details">
                    <span class="volunteer-position">${position}</span>
                    <span class="volunteer-date">${date}</span>
                    <span class="volunteer-location">${location}</span>
                    <span class="volunteer-website" style="display: none;">${website}</span>
                    <div class="volunteer-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="volunteer-actions">
                <button type="button" class="volunteer-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到志愿经历区域
        const volunteerSection = document.querySelector('.add-volunteer-btn').parentElement;
        volunteerSection.insertBefore(volunteerItem, volunteerSection.querySelector('.add-volunteer-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        volunteerModal.style.display = 'none';

        // 清空输入框
        volunteerModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        volunteerModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 志愿经历菜单相关功能
    const volunteerSection = document.querySelector('.editor-section .section-icon[data-icon="🤝"]').closest('.editor-section');
    const volunteerMenuTrigger = volunteerSection.querySelector('.menu-trigger');
    const volunteerMenuDropdown = volunteerMenuTrigger.nextElementSibling;
    const toggleVolunteerVisibilityItem = document.querySelector('.menu-item.toggle-volunteer-visibility');
    let isVolunteerVisible = true;

    // 显示/隐藏志愿经历菜单
    volunteerMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        volunteerMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        volunteerMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    volunteerMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换志愿经历可见性功能
    toggleVolunteerVisibilityItem.addEventListener('click', function() {
        isVolunteerVisible = !isVolunteerVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewVolunteers = document.querySelector('.preview-volunteers');

        if (isVolunteerVisible) {
            visibilityText.textContent = '隐藏经历';
            if (previewVolunteers) {
                previewVolunteers.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示经历';
            if (previewVolunteers) {
                previewVolunteers.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isVolunteerVisible) {
                const previewVolunteers = document.querySelector('.preview-volunteers');
                if (previewVolunteers) {
                    previewVolunteers.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        volunteerMenuDropdown.classList.remove('show');
    });

    // 推荐人/信弹窗相关功能
    const addReferenceBtn = document.querySelector('.add-reference-btn');
    const addReferenceMenuItem = document.querySelector('.menu-item.add-reference');
    const referenceModal = document.querySelector('.reference-modal');
    const closeReferenceModal = referenceModal.querySelector('.close-modal');
    const createReferenceBtn = referenceModal.querySelector('.create-btn');

    // 推荐人/信弹窗中的富文本编辑器功能
    const referenceEditor = referenceModal.querySelector('.editor-content-area');
    const referenceToolbar = referenceModal.querySelector('.editor-toolbar');

    // 确保编辑区域可编辑
    referenceEditor.contentEditable = 'true';
    referenceEditor.designMode = 'on';

    // 工具栏按钮点击处理
    referenceToolbar.addEventListener('click', function(e) {
        const button = e.target.closest('.toolbar-btn');
        if (!button) return;

        e.preventDefault();
        const command = button.dataset.command;

        if (command === 'insertImage') {
            // 处理图片上传
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else {
            // 处理其他命令
            document.execCommand(command, false, null);
        }

        // 更新按钮状态
        updateReferenceToolbarState();
    });

    // 更新工具栏按钮状态
    function updateReferenceToolbarState() {
        const buttons = referenceToolbar.querySelectorAll('.toolbar-btn');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (['bold', 'italic', 'underline'].includes(command)) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 监听编辑器内容变化
    referenceEditor.addEventListener('input', updateReferenceToolbarState);
    referenceEditor.addEventListener('click', updateReferenceToolbarState);
    referenceEditor.addEventListener('keyup', updateReferenceToolbarState);

    // 打开弹窗（通过按钮或菜单项）
    [addReferenceBtn, addReferenceMenuItem].forEach(btn => {
        btn.addEventListener('click', function() {
            referenceModal.style.display = 'flex';
            // 关闭菜单下拉框（如果是通过菜单项打开的）
            const dropdown = document.querySelector('.menu-dropdown.show');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // 关闭弹窗
    closeReferenceModal.addEventListener('click', function() {
        referenceModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    referenceModal.addEventListener('click', function(e) {
        if (e.target === referenceModal) {
            referenceModal.style.display = 'none';
        }
    });

    // 复制链接按钮功能
    referenceModal.querySelector('.copy-link-btn').addEventListener('click', function() {
        const urlInput = this.previousElementSibling;
        urlInput.select();
        document.execCommand('copy');
    });

    // 创建按钮功能
    createReferenceBtn.addEventListener('click', function() {
        // 获取表单数据
        const name = referenceModal.querySelector('input[placeholder="请输入推荐人姓名"]').value;
        const description = referenceModal.querySelector('input[placeholder="请输入推荐人描述"]').value;
        const website = referenceModal.querySelector('input[placeholder="https://rxresu.me"]').value;
        const summary = referenceModal.querySelector('.editor-content-area').innerHTML;

        // 创建新的推荐人/信条目
        const referenceItem = document.createElement('div');
        referenceItem.className = 'reference-item';
        referenceItem.innerHTML = `
            <div class="reference-content">
                <h3 class="reference-name">${name}</h3>
                <div class="reference-details">
                    <span class="reference-description">${description}</span>
                    <span class="reference-website" style="display: none;">${website}</span>
                    <div class="reference-summary" style="display: none;">${summary}</div>
                </div>
            </div>
            <div class="reference-actions">
                <button type="button" class="reference-action-btn" title="更多选项">⋮</button>
            </div>
        `;

        // 将新条目添加到推荐人/信区域
        const referenceSection = document.querySelector('.add-reference-btn').parentElement;
        referenceSection.insertBefore(referenceItem, referenceSection.querySelector('.add-reference-btn'));

        // 更新预览
        generatePreview();

        // 关闭弹窗
        referenceModal.style.display = 'none';

        // 清空输入框
        referenceModal.querySelectorAll('.modal-input').forEach(input => {
            input.value = '';
        });
        referenceModal.querySelector('.editor-content-area').innerHTML = '';
    });

    // 推荐人/信菜单相关功能
    const referenceSection = document.querySelector('.editor-section .section-icon[data-icon="👥"]').closest('.editor-section');
    const referenceMenuTrigger = referenceSection.querySelector('.menu-trigger');
    const referenceMenuDropdown = referenceMenuTrigger.nextElementSibling;
    const toggleReferenceVisibilityItem = document.querySelector('.menu-item.toggle-reference-visibility');
    let isReferenceVisible = true;

    // 显示/隐藏推荐人/信菜单
    referenceMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        referenceMenuDropdown.classList.toggle('show');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        referenceMenuDropdown.classList.remove('show');
    });

    // 防止点击菜单内部时关闭
    referenceMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 切换推荐人/信可见性功能
    toggleReferenceVisibilityItem.addEventListener('click', function() {
        isReferenceVisible = !isReferenceVisible;
        const visibilityText = this.querySelector('.visibility-text');
        const previewReferences = document.querySelector('.preview-references');

        if (isReferenceVisible) {
            visibilityText.textContent = '隐藏推荐';
            if (previewReferences) {
                previewReferences.style.display = 'block';
            }
        } else {
            visibilityText.textContent = '显示推荐';
            if (previewReferences) {
                previewReferences.style.display = 'none';
            }
        }

        // 更新预览时考虑可见性
        const originalGeneratePreview = generatePreview;
        generatePreview = function() {
            originalGeneratePreview();
            if (!isReferenceVisible) {
                const previewReferences = document.querySelector('.preview-references');
                if (previewReferences) {
                    previewReferences.style.display = 'none';
                }
            }
        };

        generatePreview();
        
        // 关闭菜单
        referenceMenuDropdown.classList.remove('show');
    });

    // 添加新章节功能
    const addSectionBtn = document.querySelector('.add-section-btn');

    addSectionBtn.addEventListener('click', function() {
        // 创建新的自定义章节
        const customSection = document.createElement('div');
        customSection.className = 'editor-section';
        customSection.innerHTML = `
            <div class="section-header">
                <div class="section-icon-wrapper">
                    <span class="section-icon" data-icon="📄">📄</span>
                </div>
                <span>自定义章节</span>
                <div class="section-menu">
                    <button class="menu-trigger">☰</button>
                    <div class="menu-dropdown">
                        <button class="menu-item add-custom">增加章节</button>
                        <button class="menu-item toggle-custom-visibility">
                            <span class="visibility-text">隐藏内容</span>
                        </button>
                    </div>
                </div>
            </div>
            <button class="add-custom-btn">
                <span class="plus-icon">+</span>
                增加章节
            </button>
        `;

        // 将新章节插入到"添加新章节"按钮之前
        const addSectionWrapper = document.querySelector('.add-section-wrapper');
        addSectionWrapper.parentNode.insertBefore(customSection, addSectionWrapper);

        // 为新章节添加菜单功能
        const menuTrigger = customSection.querySelector('.menu-trigger');
        const menuDropdown = menuTrigger.nextElementSibling;
        let isCustomVisible = true;

        // 显示/隐藏菜单
        menuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            menuDropdown.classList.toggle('show');
        });

        // 点击其他地方关闭菜单
        document.addEventListener('click', function() {
            menuDropdown.classList.remove('show');
        });

        // 防止点击菜单内部时关闭
        menuDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // 切换可见性功能
        const toggleVisibilityItem = customSection.querySelector('.toggle-custom-visibility');
        toggleVisibilityItem.addEventListener('click', function() {
            isCustomVisible = !isCustomVisible;
            const visibilityText = this.querySelector('.visibility-text');
            const sectionTitle = customSection.querySelector('.section-header span:not(.section-icon)').textContent;
            const previewCustomSection = document.querySelector(`.preview-custom-section h2:contains('${sectionTitle}')`).closest('.preview-custom-section');

            if (isCustomVisible) {
                visibilityText.textContent = '隐藏内容';
                if (previewCustomSection) {
                    previewCustomSection.style.display = 'block';
                }
            } else {
                visibilityText.textContent = '显示内容';
                if (previewCustomSection) {
                    previewCustomSection.style.display = 'none';
                }
            }

            // 更新预览
            generatePreview();
            
            // 关闭菜单
            menuDropdown.classList.remove('show');
        });

        // 添加弹窗功能
        const customModal = document.querySelector('.custom-section-modal');
        const closeCustomModal = customModal.querySelector('.close-modal');
        const createCustomBtn = customModal.querySelector('.create-btn');
        const addCustomBtn = customSection.querySelector('.add-custom-btn');
        const addCustomMenuItem = customSection.querySelector('.menu-item.add-custom');

        // 打开弹窗（通过按钮或菜单项）
        [addCustomBtn, addCustomMenuItem].forEach(btn => {
            btn.addEventListener('click', function() {
                customModal.style.display = 'flex';
                // 关闭菜单下拉框（如果是通过菜单项打开的）
                const dropdown = document.querySelector('.menu-dropdown.show');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            });
        });

        // 关闭弹窗
        closeCustomModal.addEventListener('click', function() {
            customModal.style.display = 'none';
        });

        // 点击弹窗外部关闭
        customModal.addEventListener('click', function(e) {
            if (e.target === customModal) {
                customModal.style.display = 'none';
            }
        });

        // 复制链接按钮功能
        customModal.querySelector('.copy-link-btn').addEventListener('click', function() {
            const urlInput = this.previousElementSibling;
            urlInput.select();
            document.execCommand('copy');
        });

        // 创建按钮功能
        createCustomBtn.addEventListener('click', function() {
            // 获取表单数据
            const name = customModal.querySelector('input[placeholder="请输入名称"]').value;
            const description = customModal.querySelector('input[placeholder="请输入描述"]').value;
            const date = customModal.querySelector('input[placeholder="2023 年 3 月至今"]').value;
            const location = customModal.querySelector('input[placeholder="请输入地点"]').value;
            const website = customModal.querySelector('input[placeholder="https://rxresu.me"]').value;
            const summary = customModal.querySelector('.editor-content-area').innerHTML;
            const keywords = customModal.querySelector('input[placeholder="您可以通过用逗号或回车分隔来添加多个关键字"]').value;

            // 创建新的条目
            const customItem = document.createElement('div');
            customItem.className = 'custom-item';
            customItem.innerHTML = `
                <div class="custom-content">
                    <h3 class="custom-name">${name}</h3>
                    <div class="custom-details">
                        <span class="custom-description">${description}</span>
                        <span class="custom-date">${date}</span>
                        <span class="custom-location">${location}</span>
                        <span class="custom-website" style="display: none;">${website}</span>
                        <div class="custom-summary" style="display: none;">${summary}</div>
                        <span class="custom-keywords" style="display: none;">${keywords}</span>
                    </div>
                </div>
                <div class="custom-actions">
                    <button type="button" class="custom-action-btn" title="更多选项">⋮</button>
                </div>
            `;

            // 将新条目添加到自定义章节区域
            const customBtn = customSection.querySelector('.add-custom-btn');
            customSection.insertBefore(customItem, customBtn);

            // 更新预览
            generatePreview();

            // 关闭弹窗
            customModal.style.display = 'none';

            // 清空输入框
            customModal.querySelectorAll('.modal-input').forEach(input => {
                input.value = '';
            });
            customModal.querySelector('.editor-content-area').innerHTML = '';
        });
    });

    // 在 DOMContentLoaded 事件监听器中添加模板相关代码
    const templateList = document.querySelector('.template-list');
    const templates = {
        template1: {
            // 原有的模板选择功能内容
        },
        // ... 其他模板选择内容 ...

        // 添加样式模板
        classic: {
            styles: `
                .resume-content { font-family: 'Times New Roman', serif; }
                .section h2 { border-bottom: 2px solid #000; }
            `
        },
        modern: {
            styles: `
                .resume-content { font-family: 'Arial', sans-serif; }
                .section h2 { background: #f0f0f0; padding: 8px; }
            `
        },
        creative: {
            styles: `
                .resume-content { font-family: 'Helvetica', sans-serif; }
                .section h2 { color: #2196F3; }
            `
        }
    };

    // 生成模板列表
    Object.entries(templates).forEach(([id, template]) => {
        if (template.name) {  // 只处理包含模板信息的条目
            const templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            templateItem.innerHTML = `
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <div class="template-preview-text">
                        <p><strong>示例内容：</strong></p>
                        <p>姓名：${template.content?.name || ''}</p>
                        <p>职位：${template.content?.title || ''}</p>
                        <p>简介：${template.content?.summary || ''}</p>
                    </div>
                </div>
                <button class="use-template-btn" data-template="${id}">使用此模板</button>
            `;
            templateList.appendChild(templateItem);
        }
    });

    // 添加模板选择功能
    document.querySelectorAll('.use-template-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const templateId = this.dataset.template;
            const selectedTemplate = templates.find(t => t.id === templateId);
            
            // 填充表单数据
            if (selectedTemplate) {
                const content = selectedTemplate.content;
                document.querySelector('.editor-input[value="西小与子"]').value = content.name;
                document.querySelector('.editor-input[placeholder="请输入您的职位"]').value = content.title;
                document.querySelector('.editor-input[placeholder="请输入您的邮箱"]').value = content.email;
                document.querySelector('.editor-input[placeholder="请输入您的电话"]').value = content.phone;
                document.querySelector('.editor-input[placeholder="请输入您的网站"]').value = content.website;
                document.querySelector('.editor-input[placeholder="请输入您的位置"]').value = content.location;
                document.querySelector('.editor-content-area').innerHTML = content.summary;
            }

            // 更新预览
            generatePreview();
        });
    });

    // 获取工具栏按钮
    const undoBtn = document.querySelector('.tool-btn[title="撤销"]');
    const redoBtn = document.querySelector('.tool-btn[title="重做"]');
    const shareBtn = document.querySelector('.tool-btn[title="分享"]');
    const zoomInBtn = document.querySelector('.tool-btn[title="放大"]');
    const zoomOutBtn = document.querySelector('.tool-btn[title="缩小"]');
    const sortBtn = document.querySelector('.tool-btn[title="调整顺序"]');
    const templateBtn = document.querySelector('.tool-btn[title="更改模板"]');
    const exportBtn = document.querySelector('.tool-btn[title="导出PDF"]');

    // 检查按钮是否存在
    console.log('工具栏按钮状态:', {
        undoBtn: !!undoBtn,
        redoBtn: !!redoBtn,
        shareBtn: !!shareBtn,
        zoomInBtn: !!zoomInBtn,
        zoomOutBtn: !!zoomOutBtn,
        sortBtn: !!sortBtn,
        templateBtn: !!templateBtn,
        exportBtn: !!exportBtn
    });

    // 获取预览区域
    const previewContent = document.querySelector('.resume-preview');
    const resumeBody = previewContent?.querySelector('.resume-body');

    // 检查预览区域是否存在
    if (!previewContent) {
        console.error('预览区域未找到');
        return;
    }

    // 状态管理
    let currentScale = 1.0;
    let isSortMode = false;
    let history = [];
    let currentStep = -1;

    // 为每个按钮添加点击事件监听器，并添加错误处理
    const addClickHandler = (btn, handler) => {
        btn?.addEventListener('click', (e) => {
            try {
                handler(e);
            } catch (error) {
                console.error('按钮点击处理出错:', error);
            }
        });
    };

    // 添加事件监听器
    addClickHandler(undoBtn, () => {
        if (currentStep > 0) {
            currentStep--;
            restoreState(history[currentStep]);
        }
    });

    addClickHandler(redoBtn, () => {
        if (currentStep < history.length - 1) {
            currentStep++;
            restoreState(history[currentStep]);
        }
    });

    addClickHandler(shareBtn, () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert('链接已复制到剪贴板'))
            .catch(() => alert('复制失败，请手动复制：' + shareUrl));
    });

    addClickHandler(zoomInBtn, () => {
        if (currentScale < 2.0) {
            currentScale += 0.1;
            previewContent.style.transform = `scale(${currentScale})`;
        }
    });

    addClickHandler(zoomOutBtn, () => {
        if (currentScale > 0.5) {
            currentScale -= 0.1;
            previewContent.style.transform = `scale(${currentScale})`;
        }
    });

    addClickHandler(sortBtn, () => {
        isSortMode = !isSortMode;
        const sections = previewContent.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.cursor = isSortMode ? 'move' : 'default';
            section.draggable = isSortMode;
        });
        sortBtn.classList.toggle('active', isSortMode);
    });

    // 拖拽排序功能
    if (resumeBody) {
        resumeBody.addEventListener('dragstart', (e) => {
            if (!isSortMode) return;
            e.target.closest('.section')?.classList.add('dragging');
        });

        resumeBody.addEventListener('dragend', (e) => {
            if (!isSortMode) return;
            e.target.closest('.section')?.classList.remove('dragging');
            saveState(); // 保存排序后的状态
        });

        resumeBody.addEventListener('dragover', (e) => {
            if (!isSortMode) return;
            e.preventDefault();
            const draggingSection = resumeBody.querySelector('.dragging');
            if (!draggingSection) return;

            const sections = [...resumeBody.querySelectorAll('.section:not(.dragging)')];
            const nextSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return e.clientY < rect.top + rect.height / 2;
            });

            if (nextSection) {
                resumeBody.insertBefore(draggingSection, nextSection);
            }
        });
    }

    // 状态管理函数
    function saveState() {
        const state = {
            content: previewContent.innerHTML,
            scale: currentScale
        };
        history = history.slice(0, currentStep + 1);
        history.push(state);
        currentStep++;
    }

    function restoreState(state) {
        if (state) {
            previewContent.innerHTML = state.content;
            currentScale = state.scale;
            previewContent.style.transform = `scale(${currentScale})`;
        }
    }

    // 监听内容变化
    previewContent.addEventListener('input', () => {
        saveState();
    });

    // 初始化
    saveState();

    // 在其他事件监听器后添加导出PDF功能
    addClickHandler(exportBtn, () => {
        // 创建打印样式
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                /* 隐藏所有其他元素 */
                body * {
                    visibility: hidden;
                    margin: 0;
                    padding: 0;
                }
                /* 只显示预览区域 */
                .resume-preview, .resume-preview * {
                    visibility: visible;
                }
                /* 设置预览区域的打印样式 */
                .resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 210mm;  /* A4 纸宽度 */
                    height: 297mm; /* A4 纸高度 */
                    padding: 20mm;
                    margin: 0;
                    box-shadow: none;
                    transform: none !important;
                }
                /* 隐藏编辑相关的元素 */
                .tool-btn, .preview-tools, .sidebar {
                    display: none !important;
                }
            }
        `;

        try {
            // 添加打印样式
            document.head.appendChild(printStyles);
            
            // 触发打印对话框
            window.print();
            
            // 打印完成后移除样式
            document.head.removeChild(printStyles);
        } catch (error) {
            console.error('导出PDF时出错:', error);
            alert('导出PDF失败，请重试');
        }
    });

    // 在其他事件监听器后添加模板更改功能
    addClickHandler(templateBtn, () => {
        // 获取右侧模板列表中的所有模板
        const templateItems = document.querySelectorAll('.template-item');
        
        // 如果当前在预览模式，切换到右侧模板栏
        const templateSidebar = document.querySelector('.template-sidebar');
        if (templateSidebar) {
            // 高亮显示模板侧边栏
            templateSidebar.style.borderLeft = '2px solid #2196F3';
            
            // 添加模板点击事件（如果还没有添加）
            templateItems.forEach(item => {
                if (!item._hasTemplateListener) {
                    item._hasTemplateListener = true;
                    item.addEventListener('click', function() {
                        // 获取模板名称（从预览文本中获取）
                        const templateName = this.querySelector('.template-preview').textContent.trim();
                        console.log('应用模板:', templateName); // 调试用
                        applyTemplate(templateName.toLowerCase());
                        
                        // 取消高亮
                        templateSidebar.style.borderLeft = '';
                        
                        // 保存状态
                        saveState();
                    });
                }
            });
        }
    });

    // 修改应用模板的函数
    function applyTemplate(templateName) {
        const templateStyles = {
            'azurill': {
                styles: `
                    .resume-preview, .preview-content { 
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        color: #2c3e50;
                        line-height: 1.6;
                    }
                    .resume-preview .section, .preview-content .section { 
                        margin-bottom: 2em;
                        padding: 20px;
                        border-radius: 8px;
                        background: #f8f9fa;
                    }
                    .resume-preview .section h2, .preview-content .section h2 { 
                        color: #3498db;
                        font-size: 1.5em;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 8px;
                        margin-bottom: 16px;
                    }
                    .resume-preview .content, .preview-content .content { 
                        padding: 10px 0; 
                    }
                `
            },
            'bronzor': {
                styles: `
                    .resume-preview, .preview-content { 
                        font-family: 'Georgia', 'Times New Roman', serif;
                        color: #2d3436;
                        line-height: 1.8;
                    }
                    .resume-preview .section, .preview-content .section { 
                        margin-bottom: 2em;
                        padding: 25px;
                        border: 1px solid #dfe6e9;
                        position: relative;
                    }
                    .resume-preview .section h2, .preview-content .section h2 { 
                        color: #636e72;
                        font-size: 1.4em;
                        background: #dfe6e9;
                        padding: 10px 20px;
                        margin: -25px -25px 20px;
                        letter-spacing: 1px;
                    }
                    .resume-preview .content, .preview-content .content { 
                        padding: 15px;
                        border-left: 3px solid #dfe6e9;
                    }
                `
            },
            'cascoon': {
                styles: `
                    .resume-preview, .preview-content { 
                        font-family: 'Roboto', 'Segoe UI', sans-serif;
                        color: #333;
                        line-height: 1.5;
                    }
                    .resume-preview .section, .preview-content .section { 
                        margin-bottom: 2.5em;
                        padding: 0;
                    }
                    .resume-preview .section h2, .preview-content .section h2 { 
                        color: #e17055;
                        font-size: 1.6em;
                        margin-bottom: 20px;
                        padding-left: 15px;
                        border-left: 4px solid #e17055;
                    }
                    .resume-preview .content, .preview-content .content { 
                        padding: 15px;
                        background: #fff;
                        box-shadow: 0 2px 15px rgba(0,0,0,0.05);
                        border-radius: 5px;
                    }
                `
            },
            'diglett': {
                styles: `
                    .resume-preview, .preview-content { 
                        font-family: 'Playfair Display', serif;
                        color: #2c3e50;
                        line-height: 1.7;
                    }
                    .resume-preview .section, .preview-content .section { 
                        margin-bottom: 3em;
                        padding: 20px;
                        border: 2px solid #2c3e50;
                        position: relative;
                    }
                    .resume-preview .section h2, .preview-content .section h2 { 
                        color: #2c3e50;
                        font-size: 1.5em;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        background: white;
                        padding: 0 15px;
                        position: absolute;
                        top: -15px;
                        left: 20px;
                    }
                    .resume-preview .content, .preview-content .content { 
                        padding-top: 20px;
                    }
                `
            }
        };

        const template = templateStyles[templateName];
        if (template) {
            try {
                // 更新或创建样式标签
                let styleSheet = document.getElementById('template-styles');
                if (!styleSheet) {
                    styleSheet = document.createElement('style');
                    styleSheet.id = 'template-styles';
                    document.head.appendChild(styleSheet);
                }
                styleSheet.textContent = template.styles;
                console.log('样式已应用:', templateName); // 调试用
            } catch (error) {
                console.error('应用模板样式时出错:', error);
            }
        } else {
            console.warn('未找到模板:', templateName);
        }
    }

    // 在现有代码后添加 AI 功能
    const aiBtn = document.querySelector('.ai-btn');
    const aiModal = document.querySelector('.ai-modal');
    const aiFeatureBtns = document.querySelectorAll('.ai-feature-btn');
    const aiWorkspace = document.querySelector('.ai-workspace');
    const aiInput = document.querySelector('.ai-input');
    const aiGenerateBtn = document.querySelector('.ai-generate-btn');
    const aiCancelBtn = document.querySelector('.ai-cancel-btn');
    const aiResult = document.querySelector('.ai-result');

    // 显示 AI 弹窗
    aiBtn?.addEventListener('click', () => {
        aiModal.style.display = 'flex';
        aiWorkspace.style.display = 'none';
        aiResult.style.display = 'none';
    });

    // 关闭弹窗
    document.querySelector('.ai-modal .close-modal')?.addEventListener('click', () => {
        aiModal.style.display = 'none';
    });

    // 选择 AI 功能
    aiFeatureBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const feature = btn.dataset.feature;
            aiWorkspace.style.display = 'block';
            
            // 根据不同功能设置不同的提示文本
            switch (feature) {
                case 'generate':
                    aiInput.placeholder = '请输入您的职业、工作年限和主要技能...';
                    break;
                case 'optimize':
                    aiInput.placeholder = '请粘贴需要优化的内容...';
                    break;
                case 'keywords':
                    aiInput.placeholder = '请输入目标职位的招聘描述...';
                    break;
            }
            
            // 保存当前选择的功能
            aiGenerateBtn.dataset.feature = feature;
        });
    });

    // 生成内容
    aiGenerateBtn.addEventListener('click', async () => {
        const feature = aiGenerateBtn.dataset.feature;
        const input = aiInput.value.trim();
        
        if (!input) {
            alert('请输入必要的信息');
            return;
        }
        
        // 显示加载状态
        aiGenerateBtn.disabled = true;
        aiGenerateBtn.textContent = '生成中...';
        aiResult.style.display = 'block';
        aiResult.textContent = '正在生成内容，请稍候...';
        
        try {
            // 这里需要替换为实际的 AI API 调用
            const response = await generateAIContent(feature, input);
            aiResult.textContent = response;
        } catch (error) {
            aiResult.textContent = '生成内容时出错，请重试';
        } finally {
            aiGenerateBtn.disabled = false;
            aiGenerateBtn.textContent = '生成';
        }
    });

    // AI 内容生成函数（示例）
    async function generateAIContent(feature, input) {
        // 预设的模板内容
        const templates = {
            generate: {
                '前端开发': `工作经验：
• 负责公司核心产品的前端开发，使用 React、Vue 等框架
• 优化网站性能，提升页面加载速度提升30%
• 与后端团队协作，完成多个重要功能模块的开发
• 参与代码评审，确保代码质量和最佳实践

技术技能：
• 精通 HTML5, CSS3, JavaScript
• 熟练使用 React, Vue 等主流框架
• 了解前端性能优化和跨浏览器兼容性
• 掌握 Git 版本控制和团队协作流程`,
                '产品经理': `工作职责：
• 负责产品需求分析、功能规划和产品设计
• 编写产品文档，协调开发团队实现产品功能
• 跟踪产品数据，持续优化产品体验
• 主导产品迭代，推动产品持续改进

核心能力：
• 优秀的产品分析和规划能力
• 良好的沟通协调能力
• 数据分析和用户研究能力
• 项目管理和团队协作能力`
            },
            optimize: {
                default: (input) => {
                    // 简单的优化规则
                    let optimized = input
                        .replace(/我负责/g, '主导')
                        .replace(/做了/g, '完成')
                        .replace(/使用/g, '运用')
                        .replace(/参与/g, '深度参与')
                        .replace(/提高/g, '显著提升');
                    return `优化后的内容：\n${optimized}\n\n改进建议：\n• 建议添加具体的数据指标\n• 可以强调项目影响力\n• 建议突出个人贡献`;
                }
            },
            keywords: {
                '前端开发': `推荐的关键词：
1. React/Vue.js
2. JavaScript/TypeScript
3. 前端性能优化
4. 响应式设计
5. 组件化开发
6. WebPack
7. Git
8. CI/CD
9. 前端工程化
10. 跨浏览器兼容性`,
                '产品经理': `推荐的关键词：
1. 需求分析
2. 产品规划
3. 用户研究
4. 数据分析
5. 项目管理
6. 敏捷开发
7. 产品原型
8. 用户体验
9. A/B测试
10. 竞品分析`
            }
        };

        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 根据不同功能返回相应内容
        switch (feature) {
            case 'generate':
                // 根据输入关键词匹配最相关的模板
                const position = input.includes('前端') ? '前端开发' : 
                               input.includes('产品') ? '产品经理' : '前端开发';
                return templates.generate[position] || '抱歉，暂无匹配的模板内容';

            case 'optimize':
                return templates.optimize.default(input);

            case 'keywords':
                // 根据输入职位匹配关键词
                const jobType = input.includes('前端') ? '前端开发' : 
                              input.includes('产品') ? '产品经理' : '前端开发';
                return templates.keywords[jobType] || '抱歉，暂无该职位的关键词建议';

            default:
                return '未知功能';
        }
    }

    // 取消生成
    aiCancelBtn.addEventListener('click', () => {
        aiWorkspace.style.display = 'none';
        aiResult.style.display = 'none';
        aiInput.value = '';
    });
}); 