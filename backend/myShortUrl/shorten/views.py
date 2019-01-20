from django.shortcuts import render
from .serializers import LinkSerializer
from .models import Link, Param
from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework.response import Response
from random import sample
from django.shortcuts import get_object_or_404
from django.views.generic.base import RedirectView
from django.http import HttpResponseRedirect
from django.views import View
import math

class LinkCreateView(CreateAPIView):
    '''
        generete a random hash code for a link  
        param: hashcode
    '''

    queryset = Link.objects.all()
    serializer_class = LinkSerializer

    def create(self, request, *args, **kwargs):
        listCases = list(range(48, 58)) + list(range(65, 91)) + list(range(97, 123))
        params = Param.objects.get(id=1)               
        link = Link.objects.filter(original_link = request.data['original_link'])
        # check if still have possibilities with the hash size
        linkCount = Link.objects.count()
        if linkCount == math.pow(len(listCases), params.len_hash):
            params.len_hash += 1
            params.save()             
        # link already in the database 
        if link :
            request.data['hashcode'] = link[0].hashcode
            serializer = LinkSerializer(data=request.data)
            if (serializer.is_valid()):
                return Response(serializer.data)
            return Response('Invalid Data', status=status.HTTP_400_BAD_REQUEST)
        # new link
        while True:
            #generate the random hash
            hashRandomASC = sample( listCases, k=params.len_hash )
            hashRandomStr = ''.join(map(chr,hashRandomASC))
            #check if the hash was used  
            link = Link.objects.filter(hashcode = hashRandomStr) 
            if len(link) == 0 : break               
        request.data['hashcode'] = hashRandomStr
        serializer = LinkSerializer(data=request.data)
        if (serializer.is_valid(raise_exception = True)):
            serializer.save()
            return Response(serializer.data)
        return Response('Invalid Data', status=status.HTTP_400_BAD_REQUEST)

class myRedirectView(View):
    '''
        get the link from the database and redirect 
        param: hashcode
    '''
    def get(self, request, *args, **kwargs):
        hashcode = kwargs['hash']
        link = Link.objects.get(hashcode = hashcode)
        if 'http' in link.original_link :
            return HttpResponseRedirect(link.original_link)
        return HttpResponseRedirect('http://'+link.original_link)