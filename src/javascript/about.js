class Demo {
  constructor() {
    this.initCursor()
    this.initHovers()
  }

  initCursor() {
    const { Back } = window
    this.outerCursor = document.querySelector('.circle-cursor-outer')
    this.innerCursor = document.querySelector('.circle-cursor-inner')
    this.outerCursorBox = this.outerCursor.getBoundingClientRect()
    this.outerCursorSpeed = 0
    this.easing = Back.easeOut.config(1.7)
    this.clientX = -100
    this.clientY = -100
    this.showCursor = false

    const unveilCursor = () => {
      TweenMax.set(this.innerCursor, {
        x: this.clientX,
        y: this.clientY
      })
      TweenMax.set(this.outerCursor, {
        x: this.clientX - this.outerCursorBox.width / 2,
        y: this.clientY - this.outerCursorBox.height / 2
      })
      setTimeout(() => {
        this.outerCursorSpeed = 0.2
      }, 100)
      this.showCursor = true
    }
    document.addEventListener('mousemove', unveilCursor)

    document.addEventListener('mousemove', (e) => {
      this.clientX = e.clientX
      this.clientY = e.clientY
    })

    const render = () => {
      TweenMax.set(this.innerCursor, {
        rotation: 90,
        x: this.clientX,
        y: this.clientY
      })
      if (!this.isStuck) {
        TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
          x: this.clientX - this.outerCursorBox.width / 2,
          y: this.clientY - this.outerCursorBox.height / 2
        })
      }
      if (this.showCursor) {
        document.removeEventListener('mousemove', unveilCursor)
      }
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  initHovers() {
    const handleMouseEnter = (e) => {
      this.isStuck = true
      const target = e.currentTarget
      const box = target.getBoundingClientRect()
      this.outerCursorOriginals = {
        width: this.outerCursorBox.width,
        height: this.outerCursorBox.height
      }
      TweenMax.to(this.innerCursor, 0.2, {
        x: box.left,
        y: box.top,
        width: box.width,
        height: box.height,
        opacity: 0.4
      })
    }

    const handleMouseLeave = () => {
      this.isStuck = false
      TweenMax.to(this.innerCursor, 0.2, {
        width: this.outerCursorOriginals.width,
        height: this.outerCursorOriginals.height,
        opacity: 0.2
      })
    }

    const mainNavHoverTween = TweenMax.to(this.innerCursor, 0.3, {
      ease: this.easing,
      paused: true,
      opacity: 1,
      width: 70,
      height: 70,
      left: -35,
      top: -35
    })

    const mainNavMouseEnter = () => {
      this.outerCursorSpeed = 0
      TweenMax.set(this.innerCursor, { opacity: 1 })
      mainNavHoverTween.play()
    }

    const mainNavMouseLeave = () => {
      this.outerCursorSpeed = 0.2
      TweenMax.set(this.innerCursor, { opacity: 1 })
      mainNavHoverTween.reverse()
    }

    const mainNavLinks = document.querySelectorAll('a')
    mainNavLinks.forEach((item) => {
      item.addEventListener('mouseenter', mainNavMouseEnter)
      item.addEventListener('mouseleave', mainNavMouseLeave)
    })
  }
}

const demo = new Demo()
