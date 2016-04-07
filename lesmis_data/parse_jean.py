#!/usr/bin/env python

import sys
import re
from collections import defaultdict

def getEdgeDict (groups):
    edges = defaultdict(dict)
    edgeCount = 0
    for g in groups:
        #print g.split(",")
        sg = sorted(g.split(","))
        l = len(sg)
        if l < 2:
            ## No edges, go to next group
            next
        for i in xrange(0,l-1):
            e = defaultdict(int)
            for j in xrange(i+1,l):
                #print i,j,sg[i],sg[j]
                e[sg[j]] += 1
                edgeCount += 1
            edges[sg[i]] = dict(e)
    if edgeCount:
        return dict(edges)
    return None

def getEdgeTuples (groups):
    edgeDict = getEdgeDict(groups)
    if edgeDict:
        edgeTuples = [] 
        for a in edgeDict.keys():
            for b in edgeDict[a].keys():
                t = (a,b,edgeDict[a][b])
                edgeTuples.append(t)
                #print t
        return edgeTuples
    return None



def parseFile(jean):
    '''parseFile: parses file and returns dict'''
    ## regex for characters
    reChar = re.compile('([A-Z][A-Z]) ([^,]+),(.+)')

    ## regex for chapters
    ##  group 1 matches Part.Book.Chap
    ##  group 2 matches just the Part
    ##  group 3 matches just the Book
    ##  group 4 matches just the Chapter
    ##  group 5 matches the chapter cooccurrence data
    reChap = re.compile('(([0-9]+)\.([0-9]+)\.([0-9]+)):(.+)')

    ## dict of characters and cooccurrence
    characterData = defaultdict()
    cooccurData = defaultdict()

    ## TODO: File format is all character detail lines,
    ## then one blank line, then all chapter cooccurrence data.
    ## We can change code below to only test one or the other
    ## but currently it tests every line for BOTH conditions.

    ## Loop over the file
    for line in jean:
        ## Skip comments and blank line
        if (line[0] == "*") or (line.strip() == ""):
            next

        ## Try to match character detail format
        charMatch = reChar.match(line)
        ## Try to match chapter cooccurrence format
        chapMatch = reChap.match(line)

        if charMatch:
            ## Parse character detail
            characterData[charMatch.group(1)] = {
                "name" : charMatch.group(2),
                "description" : charMatch.group(3)
                }
        elif chapMatch:
            ## Parse chapter co-occurrence data
            cogroup =  chapMatch.group(5).split(";")
            cooccurData[chapMatch.group(1)] = {
                "groups": cogroup,\
                "characters" : sorted(set(chapMatch.group(5).replace(";",",").split(","))),\
                "relations" : getEdgeTuples(cogroup)
                }
        else:
            ## Ignore anything else
            None

    return {"characterData" : dict(characterData) , \
            "cooccurData" : dict(cooccurData)}



if __name__ == "__main__" :
    with open('jean.dat','rb') as jean:
        data = parseFile(jean)
        print data


