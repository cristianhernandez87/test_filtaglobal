export function c01() {
    console.log('c01');

    // select all imagen on c-01
    const images = document.querySelectorAll('.c-01 .img');

    // create dinamyc modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    // image in modal
    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modal.appendChild(modalImg);

    // close modal
    const closeBtn = document.createElement('span');
    closeBtn.innerText = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '30px';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '30px';
    closeBtn.style.cursor = 'pointer';
    modal.appendChild(closeBtn);

    // add modal to body
    document.body.appendChild(modal);

    // open modal for each image
    images.forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.style.display = 'flex';
      });
    });

    // close modal
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // close modal any area
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === closeBtn) {
        modal.style.display = 'none';
      }
    });

}