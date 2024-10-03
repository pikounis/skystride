import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, useProgress, Text } from "@react-three/drei";
import { Box } from "@mui/material";
import { useSpring, animated as animatedThree } from "@react-spring/three";  // Import react-spring for 3D animations
import { animated as animatedDiv, useSpring as useWebSpring } from "@react-spring/web";  // For DOM animations
import styles from "./Landing.module.css";

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

function GardenModel(props) {
    const group = useRef();
    const { scene } = useGLTF("/models/Garden.glb");

    // Rotate the garden model
    useFrame((state, delta) => {
        group.current.rotation.y += delta * 0.5;
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} scale={1.5} />
        </group>
    );
}

function MountainModel({ clicked, isMobile }) {
    const group = useRef();
    const { scene } = useGLTF("/models/Mountaintop.glb");
    const initialRotationSet = useRef(false);

    // Use a ref to control the mountain's rotation
    const rotationSpeed = 0.13;  // Define your own rotation speed

    useFrame((state, delta) => {
        // Set a fixed initial rotation once when clicked
        if (clicked && !initialRotationSet.current) {
            group.current.rotation.set(0, -Math.PI, 0);  // Set your desired initial rotation
            initialRotationSet.current = true;
        }

        // Continue rotating the mountain after the initial rotation is set
        if (clicked) {
            group.current.rotation.y += delta * rotationSpeed;  // Control rotation speed
        }
    });

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} scale={isMobile ? 14 : 30.5} />
        </group>
    );
}

function CircularButton({ position, onClick }) {
    const buttonRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Update the button's color on hover
    const color = hovered ? "#ff7b5f" : "#fbc0b3";
    const scale = hovered ? [1.1, 0.3, 1.1] : [1, 0.2, 1];

    return (
        <mesh
            ref={buttonRef}
            position={position}
            scale={scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}  // Trigger the onClick function passed down as a prop
        >
            <cylinderGeometry args={[4, 4, 0.2, 64]} />
            <meshStandardMaterial color={color} />
            <Text
                position={[0, 0.25, 0]}
                fontSize={0.8}
                color="#000000"
                rotation={[-Math.PI / 2, 0, 0.25]}
                anchorX="center"
                anchorY="middle"
            >
                Find out more
            </Text>
        </mesh>
    );
}

export default function Landing() {
    const [clicked, setClicked] = useState(false);  // Track whether the button has been clicked
    const [isMobile, setIsMobile] = useState(false);

    // Animation for the garden and button moving down
    const { position: gardenPosition } = useSpring({
        position: clicked ? [0, -50, 0] : [0, -10, 0],  // Move down when clicked
        config: { tension: 120, friction: 20 }
    });

    // Animation for the mountain coming up from the bottom-left
    const { position: mountainPosition } = useSpring({
        position: clicked ? (isMobile ? [0, 8, 0] : [-18, -1, 0]) : (isMobile ? [0, -50, 0] : [-18, -50, 0]),  // Come up from below when clicked
        config: { tension: 120, friction: 20 }
    });

    // Animation for the image moving up and disappearing
    const { y: imageY, opacity: imageOpacity } = useSpring({
        y: clicked ? -200 : (isMobile ? 120 : 0),  // Move upwards when clicked
        opacity: clicked ? 0 : 1,  // Fade out when clicked
        config: { tension: 120, friction: 20 }
    });

    // Animation for the text coming in from the right
    const { rightTextPosition, opacity: textOpacity } = useWebSpring({
        rightTextPosition: clicked ? 0 : 300,  // Animate from right off-screen
        opacity: clicked ? 1 : 0,
        config: { tension: 120, friction: 20 }
    });

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);  // Set to true if screen width is less than or equal to 768px
        };

        window.addEventListener("resize", handleResize);
        handleResize();  // Call the function initially to set the state

        return () => window.removeEventListener("resize", handleResize);  // Clean up the event listener on unmount
    }, []);

    return (
        <Box className={styles.container} sx={{
            // backgroundImage: "url(/images/cloud-background-image.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
        }}>
            <animatedDiv.div
                style={{
                    position: "absolute",
                    top: imageY,  // Animate the top position
                    left: "50%",
                    transform: "translateX(-50%)",  // Center the image horizontally
                    opacity: imageOpacity,
                    width: (isMobile ? "90%" : "55%"),  // Set image width (adjust as necessary)
                    zIndex: 1000
                }}
            >
                <img
                    src="/sky_stride_no_background.png"  // Path to your image
                    alt="Top Image"
                    style={{ width: "100%", height: "auto" }}
                />
            </animatedDiv.div>
            <Canvas
                camera={{ position: [10, 16, 35], fov: 40 }}
                shadows
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.6}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />

                <Suspense fallback={<Loader />}>
                    {/* Animated Garden Model and Button */}
                    <animatedThree.group position={gardenPosition}>
                        <GardenModel position={[0, 0, 0]} />
                        <CircularButton position={[0, 1.2, 0]} onClick={() => setClicked(true)} />
                    </animatedThree.group>

                    {/* Animated Mountain Model */}
                    <animatedThree.group position={mountainPosition}>
                        <MountainModel clicked={clicked} isMobile={isMobile} />
                    </animatedThree.group>

                    <Environment preset="studio" />
                </Suspense>

                {/* Optional: Add controls for interactivity */}
                {/* <OrbitControls enableZoom={false} /> */}
            </Canvas>

            {/* Animated Text Section */}
            <animatedDiv.div
                style={{
                    position: "absolute",
                    right: rightTextPosition,  // Animate in from the right
                    top: "30%",
                    opacity: textOpacity,
                    padding: "20px",
                    color: "#fff",
                    fontSize: isMobile ? "1.2rem" : "2rem",
                    textAlign: "center ",
                    maxWidth: isMobile ? "90%" : "40%",
                    zIndex: 1000
                }}
            >
                <h2>Overcome Challenges, Climb Higher</h2>
                <p>Just like the mountain before you, every challenge you face brings you one step closer to achieving your goals. Climb higher, push harder, and reach the peak of your success.</p>
            </animatedDiv.div>
        </Box>
    );
}
