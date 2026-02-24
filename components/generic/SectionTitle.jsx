import React from "react";
import { cinzel } from "@/lib/fonts";

const SectionTitle = ({ title }) => {
    return (
        <div className="d-flex justify-content-center w-100 my-4">

            <div
                className="d-flex align-items-center w-100 px-3"
                style={{
                    maxWidth: "600px",
                    width: "100%",
                }}
            >
                {/* Left Line */}
                <div style={{ flex: 1, height: "0.5px", backgroundColor: "#000" }} />

                {/* Title */}
                <span
                    style={{
                        padding: "0 15px",
                        fontSize: "20px",
                        lineHeight:'100%',
                        letterSpacing: "0",
                        fontWeight:700

                    }}
                    className={cinzel.className}
                >
                    {title}
                </span>

                {/* Right Line */}
                <div style={{ flex: 1, height: "0.5px", backgroundColor: "#000" }} />
            </div>
        </div>
    );
};

export default SectionTitle;
