var olustur = new THREE.WebGLRenderer({ alpha: true }),
renkler = [0xFF0000, 0xA52A2A, 0xFFD700, 0x7CFC00, 0x40E0D0, 0x4B0082	, 0x000000],
daireyarıcap = 250,
daireler = [],
kamera,sahne,daire,daireyuzey,daireciz;

Sketch.create({

  type: Sketch.WEBGL,
  element: olustur.domElement,
  context: olustur.context,

  setup() {

    kamera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
    kamera.position.z = 1000;

    sahne = new THREE.Scene();

    daire = new THREE.SphereGeometry(daireyarıcap, 30, 30);
    daireyuzey = new THREE.MeshBasicMaterial({ color: 0x333344 });
    daireciz = new THREE.Mesh(daire, daireyuzey);
    sahne.add(daireciz);

    for (var i = 0; i < 30; i++) {
      daire = new THREE.SphereGeometry(random(5, 20), 10, 10);
      daireyuzey = new THREE.MeshBasicMaterial({ color: random(renkler) });
      daire.applyMatrix(new THREE.Matrix4().makeTranslation(0, daireyarıcap, 0));
      daireciz = new THREE.Mesh(daire, daireyuzey);

      daireciz.rotation.x = random(100);
      daireciz.rotation.y = random(100);
      daireciz.rotation.z = random(100);

      sahne.add(daireciz);

      daireler.push(daireciz);
    }
  },

  resize() {

    kamera.aspect = this.width / this.height;
    kamera.updateProjectionMatrix();

    olustur.setSize(this.width, this.height);
  },

  draw() {

    for (var i = 0; i < daireler.length; i++) {
      daireler[i].rotation.x += 0.01;
      daireler[i].rotation.y += 0.01;
      daireler[i].rotation.z += 0.01;

      olustur.render(sahne, kamera);
    }
  } });