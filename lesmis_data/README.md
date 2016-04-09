#README


The origianl "jean.dat" file from Stanford is a temporal graph.  This directory is for data files and data-munging scripts for manipulating the data into new formats.

##Les Miserables data
The Les Miserables data makes an excellent data set for developing temporal graphs.  The co-occurrences recorded in "jean.dat" are organized into groups within chapters.  The chapters are numbered by "Part", "Book" and "Chapter".  So we can treat either a group or a chapter as a unit of time, and easily specify a span of groups/chapters to include in the co-occurrence graph.

##jean.dat format
The format of the "jean.dat" file is pretty straight forward:
Lines starting with asterisk are comments.
The first set of lines after the initial comments are character data.
Then there is a single blank line.  The next lines are chapter co-occurrence data.
The last line is a comment line marking the end of the data.

###Character data
The character data includes a two letter unique ID for each character, followed by a space, followed by the character's full name, followed by a comma, ending with a short description of the character.
E.g.:
<pre>JV Jean Valjean, thief of bread</pre>

###Chapter co-occurrence data
The chapter co-occurrence data is also straight forward.  There is a unique identifier for each chapter that is Part number, Book number, and Chapter number, separated by a dot/period.  Then there are groups of co-occurrence separated by a semicolon.
Within each group are the two letter ID's of characters that co-occur, separated by a comma.
E.g.:
<pre>5.7.1:MA,JV;MA,JV,CO;MA,JV</pre>
Note that there are chapters in which there are no characters, or only a single character.

##parse_jean.py
This Python script parses the format described above, generates a more useful data structure, and outputs a json object to standard out.  It is *very much* under development.  

###Output format/structure
Currently, the output is a dict of dict with two keys, "characterData" and "cooccurData".  
####characterData
characterData is a dict with the two letter character ID as keys.  Each character then points to a dict with keys "name" and "description".  E.g.:
<pre>{  
   "characterData":{  
      "FT":{  
         "name":"F\\'elix Tholomy\\`es",
         "description":" Parisian student from Toulouse"
      },
      ...
  </pre>

#####cooccurData
cooccurData is also a dict with the chapter ID as keys.  Each chapter ID points to a dict with keys "groups", "characters", and "relations". E.g.
<pre>
"cooccurData":{ 
  "5.1.23":{  
         "relations":[  
            [  
               "EN",
               "GT",
               1
            ]
         ],
         "characters":[  
            "EN",
            "GT"
         ],
         "groups":[  
            "EN,GT"
         ]
      },
    ...
</pre>
  "characters" is just a list of the characters that appear in that chapter.  These might be used as nodes in a graph.  "groups" is just a list of the co-occurrence groups, to reflect the original data in "jean.dat".  Lastly, and perhaps most valuable, relations is a list of tuples, with two character ID's and a weight of how many groups the two co-occur in.  These might be used as edges in a graph.  However, more useful will be a map-reduce of these relations from multiple chapters.
