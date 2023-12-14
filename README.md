# Total Authentication app

Express and React (vite) Listen to Single server.

#### **Proxy method ( cookie policy warning overide with cookie not set problem fix )**

1. Method 1 Server --> install and configure

`Express index config`

```
app.use(cors({
	origin: "http://localhost:5173", // forntend url
	credentials: true
})));
```

`Frontend request config- headers and withCredentials=true `

```
await  axios.post(`/api/`, formData, {
	headers: {},
	withCredentials:  true,
});
```

2. Method 2 Client => Set proxy

vite.config.ts

```
server: {
	proxy: {
		"/api": {
		target:  "http://localhost:5000",
		changeOrigin:  true,
},},},
```

`Frontend request config `

```
await  axios.post(`/path only/`, formData, {
   headers: {},
});
```
