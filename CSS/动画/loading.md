
```css

body:before{
    content: '';
    display: block;
    width: 10vw;
    height: 10vw;
    border: 2px solid #999;
    border-right: 2px solid transparent;
    border-radius: 50%;
    margin:  45vh auto;
    animation: rotate 0.6s infinite linear;
}
@keyframes rotate
{
    from {transform: rotate(0);}
    to {transform: rotate(360deg);}
}
```