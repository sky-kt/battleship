const infoTextDOM = document.getElementById('infoText')

const infoText = (() => {
  async function update (text) {
    infoTextDOM.textContent = `${text.toUpperCase()}!`
  }
  return { update }
})()

export { infoText }
