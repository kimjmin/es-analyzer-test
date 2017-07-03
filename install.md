# Elasticsearch Analyzer Tester install

## set amazon-linux (Cent OS)
Update Java
```
sudo yum remove java-1.7.0-openjdk -y
sudo yum update -y
sudo yum install java-1.8.0-openjdk -y
sudo yum install gcc kernel-devel-3.10* -y
```

Install Node.js - 그냥 sudo 로 하면 설치 안됨.. 왜일까.
```
sudo su
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs
yum install -y gcc-c++ make
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
```

먼저 config/jvm.options 메모리 적절히 조정 해 줘야 함. 시스템 메모리 절반으로.
```
curl -O -s https://s3.ap-northeast-2.amazonaws.com/kr.elastic.co/kr-analyzers/elasticsearch-korean-analyzers-5.4.2.tar.gz
tar xfz elasticsearch-korean-analyzers-5.4.2.tar.gz
cd elasticsearch-5.4.2

bin/elasticsearch-plugin install file:///home/ec2-user/elasticsearch-analysis-arirang-5.4.2.zip
bin/elasticsearch-plugin install file:///home/ec2-user/elasticsearch-analysis-seunjeon-5.4.2.zip
bin/elasticsearch-plugin install file:///home/ec2-user/elasticsearch-analysis-openkoreantext-5.4.2.2-plugin.zip
```

## Run Elasticsearch, Install seunjeon analyzer
```
bin/elasticsearch -d
curl -XPUT "http://localhost:9200/koren-analyzers" -H 'Content-Type: application/json' -d'
{
  "settings" : {
    "index":{
      "analysis":{
        "analyzer":{
          "seunjeon":{
            "type":"custom",
            "tokenizer":"seunjeon_default_tokenizer"
          }
        },
        "tokenizer": {
          "seunjeon_default_tokenizer": {
            "type": "seunjeon_tokenizer",
            "index_eojeol": false,
            "user_words": ["낄끼+빠빠,-100", "c\\+\\+", "어그로", "버카충", "abc마트"]
          }
        }
      }
    }
  }
}'
```

## Download server
```
git clone https://github.com/kimjmin/es-analyzer-test.git
cd es-analyzer-test
``` 

## install & run server
```
sudo npm install pm2 -g
npm install
pm2 start bin/www
```

## Forward IP 80 to 3000
```
sudo iptables -t nat -A PREROUTING -p tcp --dport 3000 -j REDIRECT --to-port 80
```