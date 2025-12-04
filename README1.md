

***

# **Deploying React App to Nginx on Self-Hosted EC2 Runner**

## **Overview**

This project demonstrates how to deploy a React application to an Nginx web server running on an EC2 instance configured as a self-hosted GitHub Actions runner.

***

## **Prerequisites**

*   EC2 instance (Ubuntu/Debian recommended)
*   GitHub Actions self-hosted runner installed and registered
*   Node.js (v18 or required LTS) and npm installed
*   Nginx installed or permissions to install
*   Security group with **port 80 open**
*   React application source code in GitHub repository

***

## **Workflow Trigger**

*   On **push** to `main` branch
*   Manual trigger via **workflow\_dispatch**

***

## **Steps**

### **Step 1: Checkout Repository**

```yaml
- uses: actions/checkout@v4
```

### **Step 2: Show Workspace Context**

Prints current directory and checks for `package.json`.

### **Step 3: Setup Node.js**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

### **Step 4: Clean Old Artifacts**

Removes `node_modules` and `build` folder.

### **Step 5: Install Dependencies**

```bash
npm ci
```

### **Step 6: Build React App**

```bash
npm run build
```

### **Step 7: Inspect Build Output**

Lists files in `build/` and checks `index.html`.

### **Step 8: Ensure Nginx Installed & Running**

Installs Nginx if missing, starts service.

### **Step 9: Configure Nginx for React SPA**

```nginx
server {
    listen 80 default_server;
    root /var/www/html;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}
```

### **Step 10: Deploy Build to Nginx Webroot**

*   Remove old files from `/var/www/html`
*   Copy `build/` contents
*   Set permissions and restart Nginx

### **Step 11: Verify Deployment**

*   List deployed files
*   `curl http://localhost`
*   Tail Nginx logs

***

## **How to Run**

*   Push changes to `main` branch **OR** trigger manually from GitHub Actions.
*   Access app at:  
    `http://<EC2-Public-IP>`

***

## **Best Practices**

*   Use `npm ci` for deterministic builds
*   Enable caching for static assets in Nginx
*   Add HTTPS and security headers for production
*   Implement atomic deployments for zero downtime
*   Add health checks and rollback strategy

***

