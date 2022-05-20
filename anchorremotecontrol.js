let headingsPos = []
let headings
let topMargin = 0

/**
 * Run a smooth scroll to the target position
 * @param {number} ypos Target position
 */
 function smoothScrollTo(ypos) {
  if (ypos < 0) {
    ypos = 0
  }
  window.scroll({
    top: ypos,
    behavior: "smooth"
  });
}

/**
 * Run a smooth scroll to the target anchor
 * @param {number} ypos Target position
 */
 function smoothScrollToAnchor(anchorName) {
  const anchor = document.querySelector('#' + anchorName)
  console.log(anchorName, anchor)
  const pos = Math.round(anchor.getBoundingClientRect().top) + window.scrollY - topMargin
  smoothScrollTo(pos)
}

/**
 * Get the position of the target element and run a smooth scroll to it
 * @param {HTMLElement} e Target element
 */
function scroller(e) {
  e.preventDefault()
  console.log(e.target)
  smoothScrollToAnchor(e.target.getAttribute('data-anchor'))
}

/**
 * Find the element closest to the current viewport top
 */
function scrollEvent() {
  const closest = headingsPos.filter(function(pos) {
    return pos >= window.scrollY && pos <= window.scrollY + window.innerHeight
  }).sort(function(a, b){return a-b})
  const active = document.querySelectorAll('.anchorremotecontrol-list a.active')
  for (let i = 0; i < active.length; i++) {
    active[i].classList.remove('active')
  }
  const closestAnchor = document.querySelector('.anchorremotecontrol-list a[data-pos="' + closest[0] + '"]').getAttribute('data-anchor')
  if (closestAnchor) {
    document.querySelector('.anchorremotecontrol-list a[data-anchor="' + closestAnchor + '"]').classList.add('active')
  }
}

/**
 * Add the anchorremotecontrol to the page
 */
function plantSeed() {
  let isClosed = '';
  if (localStorage.getItem('anchorremotecontrol') === 'closed') {
    isClosed = 'closed'
  } else if (window.innerWidth < 768) {
    isClosed = 'closed'
  }
  const seed = `
<style>
  .anchorremotecontrol > div {
    z-index: 99999;
  }
  .anchorremotecontrol .anchorremotecontrol-container {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 1.5em);
    max-width: 300px;
    transition: all 0.5s ease;
  }
  .anchorremotecontrol .openclose {
    z-index: 99999;
    width: 1em;
    height: 1em;
    line-height: 1em;
    box-sizing: content-box;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  .anchorremotecontrol.closed .openclose {
    transform: rotate(180deg);
  }
  .anchorremotecontrol.closed .anchorremotecontrol-container {
    transform: translateX(400px);
  }
</style>
<div class="anchorremotecontrol ` + isClosed + `">
  <div class="position-fixed top-50 translate-middle-y end-0 rounded me-2">
    <div class="text-end">
      <div class="openclose p-2 mb-2 rounded-circle bg-white shadow-sm d-inline-block text-center">
        »
      </div>
    </div>
    <div class="shadow-sm anchorremotecontrol-container">
      <div class="list-group anchorremotecontrol-list">
      </div>
    </div>
  </div>
</div>
  `;
  document.body.innerHTML += seed
}

/**
 * Find the relevent headings and add them to the list
 * @returns {Array} Array of headings
 */
function findHeadings() {
  const query = 'h1[id]:not([data-arc-ignore]), h2[id]:not([data-arc-ignore]), h3[id]:not([data-arc-ignore]), h4[id]:not([data-arc-ignore]), h5[id]:not([data-arc-ignore])'
  return document.querySelectorAll(query)
}

/**
 * Create one item in the list
 * @param {string} title Heading title
 * @param {string} anchor Anchor
 * @param {number} pos Heading position
 * @returns {HTMLElement}
 */
function createAnchor(title, anchor, pos) {
  let a = document.createElement('a')
  a.setAttribute('href', '#' + anchor)
  a.setAttribute('class', 'list-group-item list-group-item-action text-nowrap text-truncate')
  a.setAttribute('data-pos', pos)
  a.setAttribute('data-anchor', anchor)
  headingsPos.push(pos)
  a.innerText = title
  a.addEventListener('click', scroller, false)
  return a
}

/**
 * Create the list
 */
function createAnchors() {
  headings = findHeadings()
  const topAnchor = createAnchor('↑', 'top', 0)
  document.querySelector('.anchorremotecontrol-list').appendChild(topAnchor)
  for (var i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const headingId = heading.getAttribute('id')
    const headingText = heading.innerText
    const pos = Math.round(headings[i].getBoundingClientRect().top) + window.scrollY
    const anchor = createAnchor(headingText, headingId, pos)
    document.querySelector('.anchorremotecontrol-list').appendChild(anchor)
  }
}

/**
 * Update anchor list
 */
function resetHeadingsPos() {
  headingsPos = []
  headings = findHeadings()
  for (var i = 0; i < headings.length; i++) {
    const pos = Math.round(headings[i].getBoundingClientRect().top) + window.scrollY
    headingsPos.push(pos)
    document.querySelector('.anchorremotecontrol-list a[data-anchor="' + headings[i].getAttribute('id') + '"]').setAttribute('data-pos', pos)
  }
}

/**
 * Observe body change
 */
function observeBodyHeightChange() {
  const resizeObserver = new ResizeObserver(resetHeadingsPos)
  resizeObserver.observe(document.body)
}

/**
 * Initialize the anchorremotecontrol open/close button
 */
function initOpenClose() {
  document.querySelector('.anchorremotecontrol .openclose').addEventListener('click', function() {
    const arc = document.querySelector('.anchorremotecontrol')
    arc.classList.toggle('closed')
    localStorage.setItem('anchorremotecontrol', arc.classList.contains('closed') ? 'closed' : 'open')
  })
  if (localStorage.getItem('anchorremotecontrol') === 'closed') {
    document.querySelector('.anchorremotecontrol').classList.add('closed')
  }
}

/**
 * Initialize the anchorremotecontrol
 */
function init() {
  if (typeof headingTopMargin !== 'undefined') {
    topMargin = headingTopMargin
  }
  plantSeed()
  createAnchors()
  initOpenClose()
  scrollEvent()
  observeBodyHeightChange()
  window.addEventListener('scroll', scrollEvent, false)
}

window.addEventListener('load', init, false)