# Elasticsearch Analyzer Tester install

## set amazon-linux (Cent OS)
Update Java
```
sudo yum remove java-1.7.0-openjdk -y
sudo yum update -y
sudo yum install java-1.8.0-openjdk -y
sudo yum install gcc kernel-devel-3.10* -y
```

Install Node.js
```
sudo curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
sudo yum -y install nodejs
```

Install git
```
sudo yum install git -y
```

Disable firewall
```
sudo systemctl stop firewalld
sudo systemctl disable firewalld
```

## Download elasticsearch, install Analyzers.
```
curl -O -s https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.2.tar.gz
tar xfz elasticsearch-5.4.2.tar.gz
curl -O -s https://s3.ap-northeast-2.amazonaws.com/kr.elastic.co/kr-analyzers/elasticsearch-korean-analyzers-5.4.2.tar.gz
tar xfz elasticsearch-korean-analyzers-5.4.2.tar.gz
cd elasticsearch-5.4.2

```

## Download server
```
git clone https://github.com/kimjmin/es-analyzer-test.git
cd es-analyzer-test
``` 

## install & run server
```
npm install pm2 -g
npm install
pm2 start bin/www
```