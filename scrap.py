import urllib.request



def scraping(url,numb):
	print(url)
	name="nude"+str(numb)+".jpg"
	urllib.request.urlretrieve(url,name)

i=1
while(True):
	file1 = open("myfile2.txt","r") 
	for x in file1:
		scraping(x,i)
		i+=1
file1.close() 

