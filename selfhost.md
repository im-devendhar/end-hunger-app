

If your self-hosted runner shows **Offline** in GitHub, follow these steps to bring it back online:

***

### **1. Check if the runner is already configured**

```bash
cd ~/actions-runner
ls _work
```

If `_work` exists and contains folders, the runner is configured. ✅  
(No need for a new token or reconfiguration.)

***

### **2. Start the runner manually**

```bash
cd ~/actions-runner
chmod +x run.sh
./run.sh
```

*   Keep this terminal open.
*   GitHub will show the runner as **Online**.

***

### **3. (Recommended) Install as a service for auto-start**

```bash
cd ~/actions-runner
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

*   Expected output: `active (running)`
*   This ensures the runner stays online even after reboot.

***

### **4. Verify in GitHub**

*   Go to **Repo → Settings → Actions → Runners**.
*   Status should change from **Offline → Online**.

***

### **5. Trigger your workflow**

*   Push to `main`:

```bash
git add -A && git commit -m "Trigger deploy" && git push origin main
```

*   Or run manually via **Actions → Workflow Dispatch**.

***

#### ✅ Notes:

*   You do **NOT** need a new token unless you reconfigure the runner.
*   If you reboot the server and didn’t install as a service, you must run `./run.sh` again.
*   To check logs for service:

```bash
sudo journalctl -u actions.runner* -f
```

***

Would you like me to **also add a section in your README for “Initial Setup of Self-Hosted Runner”** (including downloading, configuring with token, and installing as a service)? Or keep this only for “How to bring offline runner online”?
