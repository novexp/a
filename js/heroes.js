// js/heroes.js

document.addEventListener('DOMContentLoaded', () => {

    // 示例英雄数据 (实际项目中可能从JSON文件或API加载)
    const heroesData = {
        dianwei: {
            name: '典韦',
            img: 'images/heroes/dianwei_full.png', // 模态框立绘
            role: '战士',
            faction: '长安',
            lore: '昔日是魏地有名的恶来，如今是守护长安的猛士...',
            skills: [
                { name: '激怒 (被动)', desc: '击杀或助攻会增加自身攻击力。' },
                { name: '红莲劫斧 (1技能)', desc: '移除自身控制效果并加速，下一次普攻附带额外伤害。' },
                { name: '狂暴 (2技能)', desc: '短暂延迟后对周围敌人造成伤害和减速，并大幅增加自身攻速。' },
                { name: '嗜血 (3技能)', desc: '跃向敌人，造成真实伤害和减速，并强化自身后续伤害。' }
            ]
        },
        luban7: {
             name: '鲁班七号',
            img: 'images/heroes/luban7_full.png',
            role: '射手',
            faction: '稷下',
            lore: '稷下学院的最强机器人，却总是被欺负...',
             skills: [
                { name: '火力压制 (被动)', desc: '连续普攻后会触发扫射，造成范围伤害。' },
                { name: '河豚手雷 (1技能)', desc: '向指定地点扔出手雷，造成伤害和减速。' },
                { name: '空中支援 (2技能)', desc: '向指定方向发射导弹，全图支援。' },
                { name: '无敌鲨嘴炮 (3技能)', desc: '召唤一个机关炮台，持续攻击范围内的敌人。' }
            ]
        }
        // 添加更多英雄数据
    };


    // 筛选功能
    const filterButtons = document.querySelectorAll('.filter-sort .filter-button');
    const heroCards = document.querySelectorAll('.hero-list .hero-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            const filterType = button.parentElement.querySelector('span').textContent.includes('职业') ? 'role' : 'faction'; // 判断是职业还是阵营筛选

            filterButtons.forEach(btn => {
                if (btn.parentElement.querySelector('span').textContent.includes(filterType === 'role' ? '职业' : '阵营')) {
                     btn.classList.remove('active');
                }
            });
            button.classList.add('active');

            heroCards.forEach(card => {
                const cardFilterValue = card.getAttribute(`data-${filterType}`);
                const otherFilterType = filterType === 'role' ? 'faction' : 'role';
                 // 获取另一个筛选类型的当前选中值
                const activeOtherFilterButton = document.querySelector(`.filter-sort .filter-group span:contains('${otherFilterType === 'role' ? '职业' : '阵营'}')`).parentElement.querySelector('.filter-button.active');
                const otherFilterValue = activeOtherFilterButton ? activeOtherFilterButton.getAttribute('data-filter') : 'all';


                const isPrimaryMatch = (filterValue === 'all' || cardFilterValue === filterValue);
                const isSecondaryMatch = (otherFilterValue === 'all' || card.getAttribute(`data-${otherFilterType}`) === otherFilterValue);


                if (isPrimaryMatch && isSecondaryMatch) {
                    card.style.display = 'block';
                     // 可以重新触发淡入动画
                    // card.classList.remove('fade-in', 'visible');
                    // void card.offsetWidth; // 强制重绘
                    // card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

     // 在DOM加载后手动触发一次所有筛选项的“全部”按钮点击，以显示所有英雄
    document.querySelectorAll('.filter-sort .filter-button[data-filter="all"]').forEach(btn => {
        // 确保在所有按钮都已添加事件监听器后触发
        setTimeout(() => btn.click(), 0);
    });
     // 添加 contains 伪类的 Polyfill 如果需要广泛浏览器兼容
     if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
     }
     if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
     }
      jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().indexOf(m[3]) >= 0;
      };


    // 模态框功能
    const modal = document.getElementById('heroModal');
    const modalBody = document.getElementById('modalBody');
    const closeButton = modal.querySelector('.close-button');

    heroCards.forEach(card => {
        card.addEventListener('click', () => {
            const heroId = card.getAttribute('data-hero-id');
            const data = heroesData[heroId];

            if (data) {
                // 填充模态框内容
                modalBody.querySelector('#modal-hero-name').textContent = data.name;
                modalBody.querySelector('#modal-hero-img').src = data.img;
                modalBody.querySelector('#modal-hero-role').textContent = data.role;
                modalBody.querySelector('#modal-hero-faction').textContent = data.faction;
                modalBody.querySelector('#modal-hero-lore').textContent = data.lore;

                // 生成技能列表
                const skillsDiv = modalBody.querySelector('#modal-hero-skills');
                skillsDiv.innerHTML = '<h4>技能:</h4>'; // 清空并添加标题
                data.skills.forEach(skill => {
                    const skillElement = document.createElement('p');
                    skillElement.innerHTML = `<strong>${skill.name}</strong>: ${skill.desc}`;
                    skillsDiv.appendChild(skillElement);
                });


                modal.style.display = 'flex'; // 使用flexbox居中
            }
        });
    });

    // 关闭模态框
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

     // Scroll Reveal 动画已在通用JS中处理 (.fade-in 类)
});