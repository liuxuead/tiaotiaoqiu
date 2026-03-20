document.addEventListener('DOMContentLoaded', function() {
    const disc = document.querySelector('.elastic-disc');
    const discSvg = document.querySelector('.disc-svg');
    const discShape = document.querySelector('.disc-shape');
    const discRope = document.querySelector('.disc-rope');
    const ball = document.querySelector('.center-ball');
    let isDragging = false;
    let startY = 0;
    let currentDeltaY = 0;
    let isAnimating = false;
    
    // 初始红球位置
    const ballInitialY = 164;
    
    // 最大拖动距离（四个绿绳长度 = 22 * 4 = 88像素）
    const maxDragDistance = 88;
    
    // 触发弹回效果的函数
    function triggerBounce() {
        if (!isDragging) return;
        
        isDragging = false;
        isAnimating = true;
        const bounceHeight = Math.min(currentDeltaY * 2, 300); // 脱手时弹得更高
        discSvg.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        discSvg.style.transform = 'scaleY(1)';
        discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
        
        // 红球弹起动画 - 使用SVG属性
        ball.style.transition = 'none';
        let startTime = null;
        const duration = 1200; // 脱手时动画时间更长
        
        function animateBall(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            
            if (progress < 1) {
                // 弹起阶段 (0-0.35)
                if (progress < 0.35) {
                    const bounceProgress = progress / 0.35;
                    const y = ballInitialY - bounceHeight * Math.sin(bounceProgress * Math.PI);
                    ball.setAttribute('cy', y);
                } 
                // 下落阶段 (0.35-1)
                else {
                    const fallProgress = (progress - 0.35) / 0.65;
                    const y = ballInitialY - bounceHeight * Math.sin((1 - fallProgress) * Math.PI / 2);
                    ball.setAttribute('cy', y);
                }
                requestAnimationFrame(animateBall);
            } else {
                ball.setAttribute('cy', ballInitialY);
                isAnimating = false;
            }
        }
        
        requestAnimationFrame(animateBall);
    }
    
    // 鼠标事件 - 拖动绿绳
    discRope.addEventListener('mousedown', function(e) {
        if (isAnimating) return;
        isDragging = true;
        startY = e.clientY;
        currentDeltaY = 0;
        discSvg.style.transition = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaY = e.clientY - startY;
            if (deltaY > 0) {
                currentDeltaY = deltaY;
                const depth = deltaY;
                
                // 检查是否超过最大拖动距离
                if (depth >= maxDragDistance) {
                    // 脱手弹回
                    triggerBounce();
                    return;
                }
                
                // 倒帐篷效果：减小形变程度
                const scaleY = 1 + depth / 200;
                discSvg.style.transform = `scaleY(${scaleY})`;
                
                // 调整阴影
                discSvg.style.filter = `drop-shadow(0 ${depth / 3}px ${depth / 2}px rgba(0, 0, 0, 0.4))`;
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging && currentDeltaY > 0) {
            isDragging = false;
            isAnimating = true;
            const bounceHeight = Math.min(currentDeltaY * 1.5, 200);
            discSvg.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSvg.style.transform = 'scaleY(1)';
            discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
            
            // 红球弹起动画 - 使用SVG属性
            ball.style.transition = 'none';
            let startTime = null;
            const duration = 900; // 总动画时间
            
            function animateBall(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;
                
                if (progress < 1) {
                    // 弹起阶段 (0-0.44)
                    if (progress < 0.44) {
                        const bounceProgress = progress / 0.44;
                        const y = ballInitialY - bounceHeight * Math.sin(bounceProgress * Math.PI);
                        ball.setAttribute('cy', y);
                    } 
                    // 下落阶段 (0.44-1)
                    else {
                        const fallProgress = (progress - 0.44) / 0.56;
                        const y = ballInitialY - bounceHeight * Math.sin((1 - fallProgress) * Math.PI / 2);
                        ball.setAttribute('cy', y);
                    }
                    requestAnimationFrame(animateBall);
                } else {
                    ball.setAttribute('cy', ballInitialY);
                    isAnimating = false;
                }
            }
            
            requestAnimationFrame(animateBall);
        } else if (isDragging) {
            isDragging = false;
            discSvg.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSvg.style.transform = 'scaleY(1)';
            discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
        }
    });
    
    // 触摸事件 - 拖动绿绳
    discRope.addEventListener('touchstart', function(e) {
        if (isAnimating) return;
        isDragging = true;
        startY = e.touches[0].clientY;
        currentDeltaY = 0;
        discSvg.style.transition = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const deltaY = e.touches[0].clientY - startY;
            if (deltaY > 0) {
                currentDeltaY = deltaY;
                const depth = deltaY;
                
                // 检查是否超过最大拖动距离
                if (depth >= maxDragDistance) {
                    // 脱手弹回
                    triggerBounce();
                    return;
                }
                
                // 倒帐篷效果：减小形变程度
                const scaleY = 1 + depth / 200;
                discSvg.style.transform = `scaleY(${scaleY})`;
                
                // 调整阴影
                discSvg.style.filter = `drop-shadow(0 ${depth / 3}px ${depth / 2}px rgba(0, 0, 0, 0.4))`;
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging && currentDeltaY > 0) {
            isDragging = false;
            isAnimating = true;
            const bounceHeight = Math.min(currentDeltaY * 1.5, 200);
            discSvg.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSvg.style.transform = 'scaleY(1)';
            discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
            
            // 红球弹起动画 - 使用SVG属性
            ball.style.transition = 'none';
            let startTime = null;
            const duration = 900; // 总动画时间
            
            function animateBall(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;
                
                if (progress < 1) {
                    // 弹起阶段 (0-0.44)
                    if (progress < 0.44) {
                        const bounceProgress = progress / 0.44;
                        const y = ballInitialY - bounceHeight * Math.sin(bounceProgress * Math.PI);
                        ball.setAttribute('cy', y);
                    } 
                    // 下落阶段 (0.44-1)
                    else {
                        const fallProgress = (progress - 0.44) / 0.56;
                        const y = ballInitialY - bounceHeight * Math.sin((1 - fallProgress) * Math.PI / 2);
                        ball.setAttribute('cy', y);
                    }
                    requestAnimationFrame(animateBall);
                } else {
                    ball.setAttribute('cy', ballInitialY);
                    isAnimating = false;
                }
            }
            
            requestAnimationFrame(animateBall);
        } else if (isDragging) {
            isDragging = false;
            discSvg.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSvg.style.transform = 'scaleY(1)';
            discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
        }
    });
});