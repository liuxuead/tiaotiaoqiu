document.addEventListener('DOMContentLoaded', function() {
    const disc = document.querySelector('.elastic-disc');
    const discSvg = document.querySelector('.disc-svg');
    const discShape = document.querySelector('.disc-shape');
    const discRope = document.querySelector('.disc-rope');
    const ball = document.querySelector('.center-ball');
    const ropeSegments = [
        document.getElementById('rope-segment-1'),
        document.getElementById('rope-segment-2'),
        document.getElementById('rope-segment-3'),
        document.getElementById('rope-segment-4'),
        document.getElementById('rope-segment-5'),
        document.getElementById('rope-segment-6'),
        document.getElementById('rope-segment-7'),
        document.getElementById('rope-segment-8'),
        document.getElementById('rope-segment-9'),
        document.getElementById('rope-segment-10'),
        document.getElementById('rope-segment-11'),
        document.getElementById('rope-segment-12'),
        document.getElementById('rope-segment-13'),
        document.getElementById('rope-segment-14'),
        document.getElementById('rope-segment-15'),
        document.getElementById('rope-segment-16'),
        document.getElementById('rope-segment-17'),
        document.getElementById('rope-segment-18'),
        document.getElementById('rope-segment-19'),
        document.getElementById('rope-segment-20'),
        document.getElementById('rope-segment-21'),
        document.getElementById('rope-segment-22'),
        document.getElementById('rope-segment-23'),
        document.getElementById('rope-segment-24')
    ];
    let isDragging = false;
    let startY = 0;
    let currentDeltaY = 0;
    let isAnimating = false;
    
    // 初始红球位置
    const ballInitialY = 70;
    
    // 最大拖动距离（八个绿绳长度 = 22 * 8 = 176像素）
    const maxDragDistance = 176;
    
    // 颜色定义
    const colors = {
        green: '#388E3C',
        yellow: '#FFEB3B',
        orange: '#FF9800',
        red: '#F44336'
    };
    
    // 根据进度计算颜色（0-1）
    function getColor(progress) {
        if (progress <= 0) return colors.green;
        if (progress <= 0.33) {
            // 绿色 -> 黄色
            const t = progress / 0.33;
            return interpolateColor(colors.green, colors.yellow, t);
        }
        if (progress <= 0.66) {
            // 黄色 -> 橙色
            const t = (progress - 0.33) / 0.33;
            return interpolateColor(colors.yellow, colors.orange, t);
        }
        // 橙色 -> 红色
        const t = (progress - 0.66) / 0.34;
        return interpolateColor(colors.orange, colors.red, t);
    }
    
    // 颜色插值函数
    function interpolateColor(color1, color2, t) {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // 更新绿绳颜色 - 从底部开始变色
    function updateRopeColor(depth) {
        const progress = Math.min(depth / maxDragDistance, 1);
        
        // 当接近最大距离时（80%以上），所有线段都变成红色
        if (progress >= 0.8) {
            ropeSegments.forEach(segment => {
                segment.setAttribute('stroke', colors.red);
            });
        } else {
            // 24段绳子，从底部（第24段）开始变色
            const segmentCount = 24;
            const segmentStep = 0.8 / segmentCount;
            
            for (let i = 0; i < segmentCount; i++) {
                const segmentProgress = Math.max(0, (progress - (segmentCount - 1 - i) * segmentStep) / segmentStep);
                const color = getColor(segmentProgress);
                ropeSegments[i].setAttribute('stroke', color);
            }
        }
    }
    
    // 重置绿绳颜色
    function resetRopeColor() {
        ropeSegments.forEach(segment => {
            segment.setAttribute('stroke', colors.green);
        });
    }
    
    // 触发弹回效果的函数
    function triggerBounce() {
        if (!isDragging) return;
        
        isDragging = false;
        isAnimating = true;
        const bounceHeight = Math.min(currentDeltaY * 2, 480); // 最大力时弹起10个自身高度（48px * 10）
        discSvg.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        discSvg.style.transform = 'scaleY(1)';
        discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
        
        // 重置绿绳颜色
        resetRopeColor();
        
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
    
    // 鼠标事件 - 拖动绿绳（所有段都可以拖动）
    ropeSegments.forEach(segment => {
        segment.addEventListener('mousedown', function(e) {
            if (isAnimating) return;
            isDragging = true;
            startY = e.clientY;
            currentDeltaY = 0;
            discSvg.style.transition = 'none';
            e.preventDefault();
        });
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
                
                // 倒帐篷效果：增大形变程度一倍
                const scaleY = 1 + depth / 100;
                discSvg.style.transform = `scaleY(${scaleY})`;
                
                // 调整阴影：增大阴影效果
                discSvg.style.filter = `drop-shadow(0 ${depth / 2}px ${depth}px rgba(0, 0, 0, 0.4))`;
                
                // 更新绿绳颜色
                updateRopeColor(depth);
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging && currentDeltaY > 0) {
            isDragging = false;
            isAnimating = true;
            const bounceHeight = Math.min(currentDeltaY * 1.5, 480); // 最大力时弹起10个自身高度（48px * 10）
            discSvg.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSvg.style.transform = 'scaleY(1)';
            discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
            
            // 重置绿绳颜色
            resetRopeColor();
            
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
            
            // 重置绿绳颜色
            resetRopeColor();
        }
    });
    
    // 触摸事件 - 拖动绿绳（所有段都可以拖动）
    ropeSegments.forEach(segment => {
        segment.addEventListener('touchstart', function(e) {
            if (isAnimating) return;
            isDragging = true;
            startY = e.touches[0].clientY;
            currentDeltaY = 0;
            discSvg.style.transition = 'none';
            e.preventDefault();
        });
    });
    
    // 在SVG容器上也绑定触摸事件，增加可触摸区域
    discSvg.addEventListener('touchstart', function(e) {
        if (isAnimating) return;
        isDragging = true;
        startY = e.touches[0].clientY;
        currentDeltaY = 0;
        discSvg.style.transition = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault(); // 阻止默认滚动行为，防止整个界面下移
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
                
                // 倒帐篷效果：增大形变程度一倍
                const scaleY = 1 + depth / 100;
                discSvg.style.transform = `scaleY(${scaleY})`;
                
                // 调整阴影：增大阴影效果
                discSvg.style.filter = `drop-shadow(0 ${depth / 2}px ${depth}px rgba(0, 0, 0, 0.4))`;
                
                // 更新绿绳颜色
                updateRopeColor(depth);
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging && currentDeltaY > 0) {
            isDragging = false;
            isAnimating = true;
            const bounceHeight = Math.min(currentDeltaY * 1.5, 480); // 最大力时弹起10个自身高度（48px * 10）
            discSvg.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            discSvg.style.transform = 'scaleY(1)';
            discSvg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))';
            
            // 重置绿绳颜色
            resetRopeColor();
            
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
            
            // 重置绿绳颜色
            resetRopeColor();
        }
    });
});