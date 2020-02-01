import csv
import os

groupDict = {}
dumpedFiles = ['armor', 'armor_series', 'item', 'skill', 'skill_pt', 'sim_extra']
simFilesTxt = ['./armorGroup', './weaponSkills']
simFilesCsv = ['./fetched/arm', './fetched/body', './fetched/charm', './fetched/deco', './fetched/head', './fetched/leg', './fetched/skill', './fetched/wst']

def getSanitizedString(string):
	string = string.replace('<ICON ALPHA>',' α').replace('<ICON BETA>',' β').replace('<ICON GAMMA>',' γ').replace('<LINE>',' ').replace('Charm V', 'Charm Ⅴ').replace('Charm IV', 'Charm Ⅳ').replace('Charm III', 'Charm Ⅲ').replace('Charm II', 'Charm Ⅱ').replace('Charm I','Charm Ⅰ').replace('\n','')
	return string

def addToDict(fJp, fEn):
	global groupDict
	with open(fJp) as fileJp, open (fEn) as fileEn:
		groupJp = fileJp.readlines()
		groupEn = fileEn.readlines()
		for i in range(len(groupJp)):
			groupDict[getSanitizedString(groupJp[i])] = getSanitizedString(groupEn[i])
		return groupDict

def writeTranslatedTxt(f):
	global groupDict
	with open(f + '.txt', 'r') as file:
		groupSim = file.readlines()

	outputArray = []

	for entry in groupSim:
		entry = getSanitizedString(entry)
		if entry in groupDict:
			#print(groupDict[entry])
			outputArray.append(groupDict[entry] + '\n')
		else:
			#print(entry)
			outputArray.append(entry + '\n')
	
	outputArray[-1] = outputArray[-1].replace('\n','')
	with open(f + '.txt', 'w') as file:
		for string in outputArray:
			file.write(string)

def writeTranslatedCsv(f):
	global groupDict
	output = open(f + '_en.csv', 'w')
	writer = csv.writer(output, delimiter=',', quoting=csv.QUOTE_MINIMAL)
	
	with open(f + '.csv', 'r') as file:
		reader = csv.reader(file, delimiter=',')
		
		# Keep headers intact
		row1 = next(reader)
		writer.writerow(row1)
		
		# Tranlsate rest
		for row in reader:
			rowArray = []
			for column in row:
				if column in groupDict:
					column = groupDict[column]
				rowArray.append(column)
			writer.writerow(rowArray)
	
	output.close()
	os.remove(f + '.csv')
	os.rename(f + '_en.csv', f + '.csv')
			
for dumpedFile in dumpedFiles:
	print(f'Adding to dict: {dumpedFile}')
	addToDict(f'./dump_en/{dumpedFile}_jpn.txt', f'./dump_en/{dumpedFile}_eng.txt')

for simFileTxt in simFilesTxt:
	print(f'Translating: {simFileTxt}')
	writeTranslatedTxt(simFileTxt)

for simFileCsv in simFilesCsv:
	print(f'Translating: {simFileCsv}')
	writeTranslatedCsv(simFileCsv)