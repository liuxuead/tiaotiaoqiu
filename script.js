document.addEventListener('DOMContentLoaded', function() {
    const disc = document.querySelector('.elastic-disc');
    const discSurface = document.querySelector('.disc-surface');
    const ball = document.querySelector('.center-ball');
    let isDragging = false;
    let startY = 0;
    let currentDeltaY = 0;
    let isAnimating = false;
    
    // 鼠标事件
    ball.addEventListener('mousedown', function(e) {
        if (isAnimating) return;
        isDragging = true;
        startY = e.clientY;
        currentDeltaY = 0;
        discSurface.style.transition = 'none';
        ball.style.transition = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaY = e.clientY - startY;
            if (deltaY > 0) {
                currentDeltaY = deltaY;
                ball.style.transform = `translateY(${deltaY}px)`;
                const depth = deltaY;
                // 计算变形参数
                const scaleY = Math.max(0.6, 1 - depth / 150); // 垂直方向压缩
                const scaleX = 1 + depth / 300; // 水平方向稍微拉伸
                const translateY = depth * 0.3; // 整体向下移动
                
                // 应用变换，形成碗状凹陷效果
                discSurface.style.transform = `translateY(${translateY}px) scaleY(${scaleY}) scaleX(${scaleX})`;
                
                // 调整阴影，增强立体感
                discSurface.style.boxShadow = `0 ${depth / 8}px ${depth / 4}px rgba(0, 0, 0, 0.3), inset 0 ${depth / 4}px ${depth / 2}px rgba(0, 0, 0, 0.3)`;
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging && currentDeltaY > 0) {
            isDragging = false;
            isAnimating = true;
            const bounceHeight = Math.min(currentDeltaY * 1.5, 200);
            discSurface.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            ball.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSurface.style.transform = 'translateY(0) scaleY(0.7) scaleX(1)';
            discSurface.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.2)';
            ball.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                ball.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                ball.style.transform = `translateY(-${bounceHeight}px)`;
                
                setTimeout(() => {
                    ball.style.transition = 'all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
                    ball.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        isAnimating = false;
                    }, 500);
                }, 400);
            }, 300);
        } else if (isDragging) {
            isDragging = false;
            discSurface.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            ball.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSurface.style.transform = 'translateY(0) scaleY(0.7) scaleX(1)';
            discSurface.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.2)';
            ball.style.transform = 'translateY(0)';
        }
    });
    
    // 触摸事件
    ball.addEventListener('touchstart', function(e) {
        if (isAnimating) return;
        isDragging = true;
        startY = e.touches[0].clientY;
        currentDeltaY = 0;
        discSurface.style.transition = 'none';
        ball.style.transition = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const deltaY = e.touches[0].clientY - startY;
            if (deltaY > 0) {
                currentDeltaY = deltaY;
                ball.style.transform = `translateY(${deltaY}px)`;
                const depth = deltaY;
                // 计算变形参数
                const scaleY = Math.max(0.6, 1 - depth / 150); // 垂直方向压缩
                const scaleX = 1 + depth / 300; // 水平方向稍微拉伸
                const translateY = depth * 0.3; // 整体向下移动
                
                // 应用变换，形成碗状凹陷效果
                discSurface.style.transform = `translateY(${translateY}px) scaleY(${scaleY}) scaleX(${scaleX})`;
                
                // 调整阴影，增强立体感
                discSurface.style.boxShadow = `0 ${depth / 8}px ${depth / 4}px rgba(0, 0, 0, 0.3), inset 0 ${depth / 4}px ${depth / 2}px rgba(0, 0, 0, 0.3)`;
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging && currentDeltaY > 0) {
            isDragging = false;
            isAnimating = true;
            const bounceHeight = Math.min(currentDeltaY * 1.5, 200);
            discSurface.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            ball.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSurface.style.transform = 'translateY(0) scaleY(0.7) scaleX(1)';
            discSurface.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.2)';
            ball.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                ball.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                ball.style.transform = `translateY(-${bounceHeight}px)`;
                
                setTimeout(() => {
                    ball.style.transition = 'all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
                    ball.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        isAnimating = false;
                    }, 500);
                }, 400);
            }, 300);
        } else if (isDragging) {
            isDragging = false;
            discSurface.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            ball.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSurface.style.transform = 'translateY(0) scaleY(0.7) scaleX(1)';
            discSurface.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.2)';
            ball.style.transform = 'translateY(0)';
        }
    });
});