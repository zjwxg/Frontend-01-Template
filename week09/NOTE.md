

# 每周总结可以写在这里

###  课堂笔记

动画与绘制

- Animaton

  - @keyframes定义   :类似理解为定义

    keyframes（关键帧：其他的帧是由关键帧算出来的）

    ```css
    @keyframes mykf{
    	from {
    		background:red
    	}
    	to{
    		background:yellow
    	}
    }
    div{
    	animation:mykf 5s infinite
    }
    ```

    - keyframes语法：

      ```css
      @keyframes mykf{
          0%{
              top:0;
              transition:top ease
          }  //from
          50%{
              top:30px;
              transition:top ease-in
          }
          75%{
              top:10px;
              transition:top ease-out
          }
          100%{
              top:0;
              transition:top linear
          }  //to
          
      }
      ```

  - Transition

    - transition-property 要变换的属性
    - transition-duration 变换的时长
    - transition-timing-function 时间曲线
    - transition-delay 延迟

  - animation使用：

    - animation-name 时间曲线
    - animation-duration 动画的时长
    - animation-timing-function 动画的时间曲线
    - animation-delay 动画开始前的延迟
    - animation-iteration-count 动画的播放次数
    - animation-direction 动画的方向

  - cubic-bezier(贝斯尔曲线)：

    - https://cubic-bezier.com

- 渲染与颜色

  - 颜色：CMYK与RGB
    - 语法颜色表示：HSL与HSV
  
- 形状：

  - border
  - box-shadow
  - border-radius
  - data uri + svg



HTML语义：

- 字符引用

  - &#161;   &amp;   &lt;   &quot;

  - ```
    &#161;
    ```

  - ```
    &amp;
    ```

  - ```
    &lt;
    ```

  - ```
    &quot;
    ```

DOM:  

- 操作
  - 导航类操作
    - parentNode
    - childNodes
    - firstChild
    - lastChild
    - nextSibling
    - previousSibling
  - 修改操作
    - appendChild
    - insertBefore
    - removeChild
    - replaceChild
  - 高级操作
    - compareDocumentPosition是一个用于比较两个节点中关系的函数
    - contains检查一个节点是否包含另一个节点的函数
    - isEqualNode检查两个节点是否完全相同
    - isSameNode检查两个节点是否是同一节点，实际上JavaScript可以用“===”
    - cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝。
- Event
  - 捕获
  - 冒泡



