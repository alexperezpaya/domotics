# Domotics
A domotics project using Zwave sensors and Raspberry with GPIO Module to comunicate with sensors.

## Scripts
	
- forever start lights.js // it will start running a job to retrieve sensor information and to check if he has to shutdown the wallplug

##Install Z-Way

```bash
# Installs razberry into raspbian -> run in raspberry connect via ssh pi@ip with pass: raspberry
wget -q -O - razberry.z-wave.me/install | sudo bash
sudo reboot
```

Wait for rebooting and point your webbrowser to http://{yourraspberryip}:8083
