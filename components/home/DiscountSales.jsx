import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { cinzel } from "@/lib/fonts";

export default function DiscountSales() {
    return (
        <Box className="w-100" sx={{ backgroundColor: "#fff6ec", py: { xs: 4, md: 5 } }}>
            <div className="container">
                <div className="row align-items-center gx-5 gy-4">

                    {/* LEFT IMAGE SECTION */}
                    <div className="col-12 col-md-6">
                        <div className="row g-3 align-items-center">

                            {/* Small images */}
                            <div className="col-4 d-flex flex-column gap-3">
                                <img
                                    src="/assets/images/sareeGreen.png"
                                    alt="thumb-1"
                                    className="img-fluid rounded"
                                />
                                <img
                                    src="/assets/images/sareeGreen.png"
                                    alt="thumb-2"
                                    className="img-fluid rounded"
                                />
                            </div>

                            {/* Main image */}
                            <div className="col-8 d-flex justify-content-start">
                                <img
                                    src="/assets/images/sareeMerun.png"
                                    alt="main"
                                    className="img-fluid rounded"
                                    style={{
                                        maxHeight: "520px",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* RIGHT CONTENT SECTION */}
                    <div className="col-12 col-md-5">
                        <Box
                            sx={{
                                textAlign: { xs: "center", md: "left" },
                                maxWidth: 420,
                                mx: { xs: "auto", md: 0 },
                            }}
                        >
                            <Typography
                                variant='title'
                                sx={{
                                    letterSpacing: 1,
                                    fontWeight: 700,
                                    fontSize: "24px"
                                }}

                                className={`${cinzel.className} primary-text-clr`}
                            >
                                Traditional Handloom
                                <br />
                                Sarees
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#555",
                                    lineHeight: 1.8,
                                    mb: 3,
                                }}
                            >
                                Handwoven with care, these sarees reflect the rich weaving
                                heritage of Elampillai, often featuring classic motifs and
                                traditional designs.
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: { xs: "center", md: "flex-start" },
                                    alignItems: "center",
                                    gap: 1.5,
                                    mb: 3,
                                }}
                            >
                                <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                                    Rs. 3999
                                </Typography>
                                <Typography
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "#999",
                                        fontSize: "13px",
                                    }}
                                >
                                    Rs. 4599
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#f4a300",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    30% Offer
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#7b1c2d",
                                    px: 4,
                                    py: 1,
                                    borderRadius: 0,
                                    fontSize: "13px",
                                    "&:hover": { backgroundColor: "#5f1623" },
                                }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                    </div>

                </div>
            </div>
        </Box>
    );
}
