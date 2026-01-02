import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// Cursor trail
document.addEventListener('pointermove', (event) => {
	const dot = document.createElement('div');
	dot.className = 'trail';
	dot.style.left = `${event.clientX - 4}px`;
	dot.style.top = `${event.clientY - 4}px`;
	document.body.appendChild(dot);

	setTimeout(() => dot.remove(), 700);
});

// Starfield
const starfieldEl = document.getElementById('starfield');
if (starfieldEl) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	starfieldEl.appendChild(renderer.domElement);

	const starGeometry = new THREE.BufferGeometry();
	const starCount = 5000;
	const positions = new Float32Array(starCount * 3);
	for (let i = 0; i < starCount * 3; i++) {
		positions[i] = (Math.random() - 0.5) * 100;
	}
	starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	const starMaterial = new THREE.PointsMaterial({ size: 0.5, color: 0xffffff });
	const stars = new THREE.Points(starGeometry, starMaterial);
	scene.add(stars);
	camera.position.z = 5;

	const animate = () => {
		requestAnimationFrame(animate);
		stars.rotation.y += 0.0005;
		renderer.render(scene, camera);
	};
	animate();

	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}
