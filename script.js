document.addEventListener('DOMContentLoaded', function() {
    const disc = document.querySelector('.elastic-disc');
    
    // 添加点击/触摸事件
    disc.addEventListener('mousedown', function() {
        disc.style.transform = 'translateX(-50%) scaleY(0.7)';
    });
    
    disc.addEventListener('mouseup', function() {
        disc.style.transform = 'translateX(-50%) scaleY(1)';
    });
    
    // 移动端触摸事件
    disc.addEventListener('touchstart', function(e) {
        e.preventDefault();
        disc.style.transform = 'translateX(-50%) scaleY(0.7)';
    });
    
    disc.addEventListener('touchend', function(e) {
        e.preventDefault();
        disc.style.transform = 'translateX(-50%) scaleY(1)';
    });
    
    // 添加鼠标离开事件，防止拖拽到外部时状态异常
    disc.addEventListener('mouseleave', function() {
        disc.style.transform = 'translateX(-50%) scaleY(1)';
    });
});