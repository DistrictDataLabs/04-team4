#!/usr/bin/env python

import parse_jean as pj

if __name__ == "__main__" :
    with open('jean.dat','rb') as jean:
        data = pj.parseFile(jean)

        ## Test cases:
        for testChar in ["JV","TH"]:
            print testChar
            print data["characterData"][testChar]

        for testChap in ["1.1.4","1.4.3","4.14.1"]:
            print testChap
            print data["cooccurData"][testChap]
