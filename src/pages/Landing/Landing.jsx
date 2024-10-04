import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, useProgress, Text } from "@react-three/drei";
import { Box, Button } from "@mui/material";
import { useSpring, animated as animatedThree, to } from "@react-spring/three";
import { animated as animatedDiv, useSpring as useWebSpring } from "@react-spring/web";
import { AiOutlineArrowLeft } from "react-icons/ai";  // Import the back arrow icon
import { Navigate, useNavigate } from "react-router-dom";  // For navigation
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
    const rotationSpeed = 0.13;

    useFrame((state, delta) => {
        if (clicked && !initialRotationSet.current) {
            group.current.rotation.set(0, -Math.PI, 0);
            initialRotationSet.current = true;
        }

        if (clicked) {
            group.current.rotation.y += delta * rotationSpeed;
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
            onClick={onClick}
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

function BoxingRingModel({ clicked, isMobile }) {
    const group = useRef();
    const { scene } = useGLTF("/models/Ballpark.glb");
    const initialRotationSet = useRef(false);

    const rotationSpeed = 0.13;

    useFrame((state, delta) => {
        if (clicked && !initialRotationSet.current) {
            group.current.rotation.set(0, -Math.PI, 0);
            initialRotationSet.current = true;
        }

        if (clicked) {
            group.current.rotation.y += delta * rotationSpeed;
        }
    });

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} scale={isMobile ? 0.3 : 0.5} />
        </group>
    );
}
export default function Landing() {
    const [clicked, setClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [page, setPage] = useState(1);  // Controls the page number (1, 2, or 3)
    const navigate = new useNavigate();


    // Animation for the garden and button moving down
    const { position: gardenPosition } = useSpring({
        position: clicked ? [0, -50, 0] : [0, -10, 0],
        config: { tension: 120, friction: 20 }
    });

    // Animation for the mountain (second page) or boxing ring (third page)
    const { position: modelPosition } = useSpring({
        position: clicked ? (isMobile ? [0, 8, 0] : page === 2 ? [-17, -1, 0] : [9, -1, 0]) : (isMobile ? [0, -50, 0] : page === 2 ? [-18, -50, 0] : [18, -50, 0]),
        config: { tension: 120, friction: 20 }
    });

    // Image animation for the landing page
    const { y: imageY, opacity: imageOpacity } = useSpring({
        y: clicked ? -200 : (isMobile ? 120 : 0),
        opacity: clicked ? 0 : 1,
        config: { tension: 120, friction: 20 }
    });

    // Text animation for the second page (right for desktop, bottom for mobile)
    const { rightTextPosition, opacity: textOpacity } = useWebSpring({
        rightTextPosition: clicked && page === 2 ? 200 : 500,
        opacity: clicked && page === 2 ? 1 : 0,
        config: { tension: 120, friction: 20 }
    });

    // Text animation for the third page (left for desktop, bottom for mobile)
    const { leftTextPosition, opacity: thirdPageTextOpacity } = useWebSpring({
        leftTextPosition: clicked && page === 3 ? 160 : -500,
        opacity: clicked && page === 3 ? 1 : 0,
        config: { tension: 120, friction: 20 }
    });

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to handle the back button click (reset to previous page)
    const handleBackClick = () => {
        if (page === 3) {
            setPage(2);
        } else {
            setClicked(false);  // Reset animations
            setPage(1);  // Go back to the first page
        }
    };

    return (
        <Box className={styles.container} sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
        }}>
            {/* Back Icon (only show when clicked === true) */}
            {clicked && (
                <div
                    onClick={handleBackClick}
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        cursor: "pointer",
                        zIndex: 2000,
                        color: "#fff"
                    }}
                >
                    <AiOutlineArrowLeft size={30} />
                </div>
            )}

            {/* Join and Login Buttons on the First Page */}
            {page === 1 && (
                <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 2000 }}>
                    <Button variant="contained" onClick={() => navigate("/signup")} style={{ marginRight: '1rem', borderRadius: '20px', backgroundColor: '#ff7b5f' }}>
                        Join
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/login")} style={{ borderRadius: '20px', color: '#ff7b5f', borderColor: '#ff7b5f' }}>
                        Login
                    </Button>
                </div>
            )}

            {/* Logo Image */}
            <animatedDiv.div
                style={{
                    position: "absolute",
                    top: isMobile ? "20px" : "100px",  // Add top padding for desktop
                    left: "50%",
                    transform: "translateX(-50%)",  // Center horizontally
                    opacity: imageOpacity,
                    width: isMobile ? "90%" : "55%",  // Width adjustment based on device
                    zIndex: 1000
                }}
            >
                <img
                    src="/images/skyStrideBlock.png"
                    alt="Top Image"
                    style={{
                        display: "block",  // Ensures the image behaves like a block element
                        margin: "0 auto",  // Centers the image horizontally
                        width: isMobile ? "80%" : "60%",  // Width adjustment based on device
                        height: "auto"
                    }}
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
                    {page === 1 && (
                        <animatedThree.group position={gardenPosition} style={{ zIndex: 1100 }}>
                            <GardenModel position={[0, 0, 0]} />
                            <CircularButton position={[0, 1.2, 0]} zIndex={2000} onClick={() => { setClicked(true); setPage(2) }} />
                        </animatedThree.group>
                    )}

                    {/* Animated Mountain Model (Second Page) */}
                    {page === 2 && (
                        <animatedThree.group position={modelPosition}>
                            <MountainModel clicked={clicked} isMobile={isMobile} />
                        </animatedThree.group>
                    )}

                    {/* Animated Boxing Ring Model (Third Page) */}
                    {page === 3 && (
                        <animatedThree.group position={modelPosition}>
                            <BoxingRingModel clicked={clicked} isMobile={isMobile} />
                        </animatedThree.group>
                    )}

                    <Environment preset="studio" />
                </Suspense>
            </Canvas>

            {/* Animated Text Section for the Second Page */}
            <animatedDiv.div
                style={{
                    position: "absolute",
                    right: isMobile ? "50%" : rightTextPosition,
                    bottom: isMobile ? "5%" : "auto",
                    transform: isMobile ? "translateX(50%)" : "none",
                    top: isMobile ? "auto" : "30%",
                    opacity: textOpacity,
                    padding: isMobile ? "10px 20px" : "20px",
                    color: "#fff",
                    fontSize: isMobile ? "1.2rem" : "2rem",
                    textAlign: "center",
                    maxWidth: isMobile ? "90%" : "40%",
                    zIndex: 200,
                    display: page === 2 ? 'unset' : 'none',
                }}
            >
                <h2 style={{ fontWeight: 'bolder', paddingBottom: '1rem' }}>Overcome Challenges, Climb Higher</h2>
                <p>Just like the mountain before you, every challenge you face brings you one step closer to achieving your goals. Climb higher, push harder, and reach the peak of your success.</p>
                <Button
                    variant="contained"
                    onClick={() => setPage(3)}
                    style={{ marginTop: '1rem', backgroundColor: '#ff7b5f', borderRadius: '20px' }}
                >
                    Next
                </Button>
            </animatedDiv.div>

            {/* Animated Text Section for the Third Page */}
            <animatedDiv.div
                style={{
                    position: "absolute",
                    left: isMobile ? "50%" : leftTextPosition,
                    bottom: isMobile ? "5%" : "auto",
                    transform: isMobile ? "translateX(-50%)" : "none",
                    top: isMobile ? "auto" : "30%",
                    opacity: thirdPageTextOpacity,
                    padding: isMobile ? "10px 20px" : "20px",
                    color: "#fff",
                    fontSize: isMobile ? "1.2rem" : "2rem",
                    textAlign: "center",
                    maxWidth: isMobile ? "90%" : "40%",
                    zIndex: 200,
                    display: page === 3 ? 'unset' : 'none',
                }}
            >
                <h2 style={{ fontWeight: 'bolder', paddingBottom: '1rem' }}>Fun, Competition, and Friends</h2>
                <p>Battle your friends and compete to see who’s the best. Enjoy friendly competition and healthy fun as you strive to improve and become the ultimate champion!</p>
                <Button
                    variant="contained"
                    onClick={() => navigate("/signup")}
                    style={{ marginTop: '1rem', backgroundColor: '#ff7b5f', borderRadius: '20px' }}
                >
                    Get Started Now!
                </Button>
            </animatedDiv.div>
        </Box>
    );
}
