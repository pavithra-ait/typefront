import React, { Component, ChangeEvent } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

interface State {
    name: string;
    password: string;
    error: string;
}

class Login extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            password: "",
            error: "",
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value });
    };


    handleSubmit = async () => {
        const { name, password } = this.state;

        try {
            await axios
                .post("http://localhost:5000/api/auth/login", { name, password })
                .then((res) => {
                    console.log(res.data);
                    this.setState({ error: "" });
                    localStorage.setItem("token", res.data.token);
                    window.location.href = '/';

                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            this.setState({ error: "Invalid credentials" });
        }
    };

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = '/';
        }
    }

    render() {
        const { name, password, error } = this.state;

        return (
            <Box
                sx={{
                    display: { xs: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "500px",
                }}
            >
                <Box
                    sx={{
                        width: "400px",
                        textAlign: "center",
                        bgcolor: "#1565c0",
                        padding: 2,
                        borderRadius: 5,
                    }}
                    boxShadow={5}
                >
                    <Typography variant="h4" color="secondary">
                        Login
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box sx={{ margin: 3 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            color="secondary"
                            focused
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handleInputChange}
                            fullWidth
                            margin="normal"
                            color="secondary"
                            focused
                        />
                        <Button
                            type="submit"
                            onClick={this.handleSubmit}
                            variant="contained"
                            color="secondary"
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Login;
