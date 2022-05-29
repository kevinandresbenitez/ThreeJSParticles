import * as THREE from '../node_modules/three/build/three.module.js';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

class main{

    //Pointer
    static PointerX = 0;
    static PointerY = 0;

    static init(){
        this.defineInstances();
        this.scene.add(this.create.ambientLight());
        this.scene.add(this.create.pointLight());

        this.scene.add(this.create.cubeSkeleton());
        this.scene.add(this.create.particles());

        this.render();
    }

    static defineInstances(){
        //Scene
        this.scene = new THREE.Scene();
        //Camera
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight ,0.1,1000);
        this.camera.position.set(0,0,3);
        //Renderer
        this.renderer = new THREE.WebGLRenderer({antialias:true,canvas:document.getElementById('Canvas')});
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.setClearColor('#8d9496');
        // Controls
        // this.controls = new OrbitControls(this.camera,this.renderer.domElement);
        
    }

    static create ={
        cube:()=>{
            const geometry = new THREE.BoxGeometry(1,1,1);
            const material = new THREE.MeshStandardMaterial({color:'#9ebdbb'});
            const cube = new THREE.Mesh(geometry,material);
            return cube ;
        },

        cubeSkeleton :()=>{
            const geometry = new THREE.TorusGeometry(1,1,16,100);
            const material = new THREE.PointsMaterial({size:0.015});
            const cube = new THREE.Points(geometry,material);
            return cube ;
        },
        particles:()=>{
            const count = 5000;
            const material = new THREE.PointsMaterial({size:0.015});
            let particlesGeometry = new THREE.BufferGeometry();
            let particlesArray= new Float32Array(count * 3);

            for(let i =0; i < count * 3;i++){
                particlesArray[i] = (Math.random() - 0.5) *5;
            }

            particlesGeometry.setAttribute('position',new THREE.BufferAttribute(particlesArray,3))

            return new THREE.Points(particlesGeometry,material);
        },

        ambientLight:()=>{
            return new THREE.AmbientLight( 0x404040 );
        },

        pointLight:()=>{
            const light = new THREE.PointLight( 0xff0000, 1, 100 );
            light.position.set( 50, 50, 50 );
            return light;
        }
    }


    static resize = ()=>{
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight);
    }

    static mouseMove = (event)=>{
        this.PointerX=event.clientX - window.innerWidth / 2;
        this.PointerY=event.clientY - window.innerHeight / 2;
    }

    static render = ()=>{
        requestAnimationFrame(this.render);

        let particles =this.scene.children[3];
        particles.position.x = this.PointerX * -0.0002;
        particles.position.y = this.PointerY * 0.0002;
        particles.rotation.z += 0.001;
        particles.rotation.y += 0.001;

        particles =this.scene.children[2];
        particles.rotation.z -= 0.001;
        particles.rotation.y -= 0.001;
        

        // this.controls.update();
        this.renderer.render(this.scene,this.camera);
    }
}

main.init();
window.addEventListener('resize',main.resize);
window.addEventListener('mousemove',main.mouseMove);