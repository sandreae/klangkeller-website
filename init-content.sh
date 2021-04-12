[ -d "./content/s10c" ] && git -C ./content/s10c pull || git clone https://github.com/sandreae/s10c-content.git ./content/s10c
cp ./content/s10c/config/local-s10c.json ./config/